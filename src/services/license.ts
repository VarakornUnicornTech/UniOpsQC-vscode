import * as vscode from 'vscode';
import * as https from 'https';
import { getLicenseKey } from './config';

export interface LicenseStatus {
  valid: boolean;
  tier: 'free' | 'pro';
  message: string;
  expiresAt?: string;
}

// Cache validation result for 24 hours to avoid excessive API calls
let cachedStatus: LicenseStatus | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Validate license key against LemonSqueezy API.
 * Falls back to offline pattern-match if API is unreachable.
 *
 * Integration steps for Commander:
 * 1. Create product on LemonSqueezy (or Gumroad)
 * 2. Set store ID and product ID below
 * 3. License keys are auto-generated when customers purchase
 * 4. This function validates them via the activation API
 */
const LEMONSQUEEZY_API = 'https://api.lemonsqueezy.com/v1/licenses';

export async function validateLicense(forceRefresh = false): Promise<LicenseStatus> {
  const key = getLicenseKey();

  if (!key || key.trim().length === 0) {
    return { valid: false, tier: 'free', message: 'No license key configured' };
  }

  // Return cached result if still fresh
  if (!forceRefresh && cachedStatus && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedStatus;
  }

  try {
    const result = await activateLicense(key.trim());
    cachedStatus = result;
    cachedAt = Date.now();
    return result;
  } catch (error: any) {
    // Offline fallback: accept keys matching pattern (prefix + length check)
    if (isValidKeyFormat(key.trim())) {
      const offlineResult: LicenseStatus = {
        valid: true,
        tier: 'pro',
        message: 'License accepted (offline mode)',
      };
      cachedStatus = offlineResult;
      cachedAt = Date.now();
      return offlineResult;
    }

    return {
      valid: false,
      tier: 'free',
      message: `Validation failed: ${error.message}`,
    };
  }
}

/**
 * Activate/validate a license key via LemonSqueezy API.
 */
function activateLicense(licenseKey: string): Promise<LicenseStatus> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      license_key: licenseKey,
      instance_name: getInstanceName(),
    });

    const url = new URL(`${LEMONSQUEEZY_API}/activate`);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);

          if (json.activated || json.valid) {
            resolve({
              valid: true,
              tier: 'pro',
              message: 'License activated',
              expiresAt: json.license_key?.expires_at || undefined,
            });
          } else if (json.error) {
            resolve({
              valid: false,
              tier: 'free',
              message: json.error || 'Invalid license key',
            });
          } else {
            resolve({
              valid: false,
              tier: 'free',
              message: 'License key not recognized',
            });
          }
        } catch {
          reject(new Error('Invalid response from license server'));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Cannot reach license server: ${error.message}`));
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('License server timeout'));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Offline key format validation.
 * Accepts keys like: RT-XXXX-XXXX-XXXX-XXXX (RoundTable prefix)
 * This is a fallback when the API is unreachable.
 */
function isValidKeyFormat(key: string): boolean {
  // Accept LemonSqueezy format or custom RT- prefix format
  return /^[A-F0-9]{8}-[A-F0-9]{8}-[A-F0-9]{8}-[A-F0-9]{8}$/i.test(key) ||
         /^RT-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(key);
}

/**
 * Generate a unique instance name for this VS Code installation.
 */
function getInstanceName(): string {
  const machineId = vscode.env.machineId;
  return `vscode-${machineId.substring(0, 8)}`;
}

/**
 * Clear cached license status (call when user changes key in settings).
 */
export function clearLicenseCache(): void {
  cachedStatus = null;
  cachedAt = 0;
}
