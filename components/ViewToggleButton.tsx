"use client";

interface ViewToggleButtonProps {
  isMapView: boolean;
  onToggle: () => void;
}

const MapIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 16.382V5.618a1 1 0 00-1.553-.894L15 7m0 13V7m0 0L9 4"
    />
  </svg>
);

const ListIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export const ViewToggleButton = ({
  isMapView,
  onToggle,
}: ViewToggleButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 rounded-full bg-stone-100 px-6 py-3 text-black cursor-pointer transition-colors hover:bg-slate-200 active:bg-slate-300 shadow-lg hover:shadow-xl"
      aria-label={isMapView ? "Go to list view" : "Go to map view"}
    >
      {isMapView ? (
        <>
          <ListIcon />
          <span>Go to list view</span>
        </>
      ) : (
        <>
          <MapIcon />
          <span>Go to map view</span>
        </>
      )}
    </button>
  );
};
