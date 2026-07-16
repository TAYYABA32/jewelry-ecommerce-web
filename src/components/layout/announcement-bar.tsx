import { ANNOUNCEMENT_MESSAGE } from "@/constants/site";

export function AnnouncementBar() {
  return (
    <div className="bg-secondary text-secondary-foreground">
      <p className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-center text-xs font-medium tracking-wide sm:text-sm">
        {ANNOUNCEMENT_MESSAGE}
      </p>
    </div>
  );
}
