import PremiumLoader from "@/components/PremiumLoader";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8f9fb] dark:bg-[#0a0a0a]">
            <PremiumLoader fullPage={false} size="lg" />
        </div>
    );
}
