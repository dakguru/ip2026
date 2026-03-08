/**
 * Centralized logic for determining membership tiers and display names.
 * This MUST align strictly with the logic used in the Admin Dashboard.
 */

export type MembershipTier = 'free' | 'silver' | 'gold' | 'diamond' | 'platinum';

/**
 * Returns the effective visual tier for a user based on their membership level and course mode.
 */
export function getMembershipTier(
    level: string | undefined | null,
    courseMode: string | undefined | null
): MembershipTier {
    const rawLevel = (level || 'free').toLowerCase();

    // Switch to higher visual tiers only if the user is in PS_GR_B course mode
    if (courseMode === 'PS_GR_B') {
        if (rawLevel === 'gold') return 'diamond';
        if (rawLevel === 'silver') return 'platinum';
    }

    return rawLevel as MembershipTier;
}

/**
 * Returns the display name for a tier.
 */
export function getTierDisplayName(tier: MembershipTier): string {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
}
