/**
 * Centralized logic for determining membership tiers, display names, and content access.
 * 
 * MEMBERSHIP TAGS:
 *   FREE     = Base tier (both courses)
 *   SILVER   = Lower tier for LDCE IP
 *   PLATINUM = Lower tier for PS Group B
 *   GOLD     = Top tier for LDCE IP
 *   DIAMOND  = Top tier for PS Group B
 * 
 * EQUIVALENCE:
 *   Gold = Diamond (level 3)
 *   Silver = Platinum (level 2)
 *   Free (level 1)
 * 
 * DB STORAGE:
 *   The DB stores 'silver' for both Silver (LDCE IP) and Platinum (PS GR B) users.
 *   The DB stores 'gold' for both Gold (LDCE IP) and Diamond (PS GR B) users.
 *   The planName field contains the actual purchased plan name and is used
 *   to determine the correct display tag.
 * 
 * The membership tag displayed in the UI ALWAYS reflects the actual plan purchased.
 * Switching course mode does NOT change the membership tag.
 */

export type MembershipTier = 'free' | 'silver' | 'gold' | 'diamond' | 'platinum';

/**
 * Resolves the correct display membership tier based on DB membershipLevel and planName.
 * 
 * Since the DB stores 'silver' for both Silver and Platinum users (and 'gold' for
 * both Gold and Diamond), we use the planName to determine the actual purchased plan:
 *   - planName contains 'diamond' → display 'diamond'
 *   - planName contains 'platinum' → display 'platinum'
 *   - otherwise → use raw DB membershipLevel
 */
export function getDisplayMembership(
    level: string | undefined | null,
    planName?: string | undefined | null
): MembershipTier {
    const rawLevel = (level || 'free').toLowerCase();
    const validTiers: MembershipTier[] = ['free', 'silver', 'gold', 'diamond', 'platinum'];
    const baseTier = validTiers.includes(rawLevel as MembershipTier) ? (rawLevel as MembershipTier) : 'free';

    // If planName is available, use it to resolve the correct display name
    if (planName) {
        const pn = planName.toLowerCase();
        if (pn.includes('diamond')) return 'diamond';
        if (pn.includes('platinum')) return 'platinum';
    }

    return baseTier;
}

/**
 * Returns the numeric membership level for access comparison.
 *   free = 1
 *   silver = 2, platinum = 2
 *   gold = 3, diamond = 3
 */
export function getMembershipLevel(tier: string | undefined | null): number {
    const t = (tier || 'free').toLowerCase();
    switch (t) {
        case 'gold':
        case 'diamond':
            return 3;
        case 'silver':
        case 'platinum':
            return 2;
        default:
            return 1;
    }
}

/**
 * Checks if a user has access to content based on membership level.
 * Uses numeric level equivalence so Gold users can access Silver content,
 * Diamond users can access Platinum content, etc.
 * 
 * @param userMembershipLevel - The user's raw membership level from DB
 * @param requiredLevel - Minimum numeric level required (1=Free, 2=Silver/Platinum, 3=Gold/Diamond)
 */
export function hasContentAccess(
    userMembershipLevel: string | undefined | null,
    requiredLevel: number
): boolean {
    return getMembershipLevel(userMembershipLevel) >= requiredLevel;
}

/**
 * Returns the display name for a tier (capitalized).
 */
export function getTierDisplayName(tier: MembershipTier): string {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
}

/**
 * Returns whether the user is a premium (paid) member.
 */
export function isPremiumMember(level: string | undefined | null): boolean {
    return getMembershipLevel(level) >= 2;
}

/**
 * Returns whether the user has top-tier membership (Gold or Diamond).
 */
export function isTopTierMember(level: string | undefined | null): boolean {
    return getMembershipLevel(level) >= 3;
}

// ============================================================
// BACKWARD COMPATIBILITY
// Keep getMembershipTier as an alias that resolves display name
// using both level and planName (extracted from courseMode context)
// ============================================================
export function getMembershipTier(
    level: string | undefined | null,
    courseMode?: string | undefined | null,
    planName?: string | undefined | null
): MembershipTier {
    return getDisplayMembership(level, planName);
}
