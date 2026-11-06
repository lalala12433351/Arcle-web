import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";

interface SceneTabsProps<T extends string> {
    label: string;
    tabs: { id: T; label: string }[];
    value: T;
    onChange: (id: T) => void;
    children: (panel: { id: string; labelledBy: string }) => ReactNode;
}

/** Text tabs following the WAI-ARIA tabs pattern: roving tabindex, arrow/Home/End keys, one panel. */
const SceneTabs = <T extends string>({ label, tabs, value, onChange, children }: SceneTabsProps<T>) => {
    const baseId = useId();
    const listRef = useRef<HTMLDivElement>(null);
    const tabId = (id: T) => `${baseId}-tab-${id}`;
    const panelId = `${baseId}-panel`;

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const index = tabs.findIndex((tab) => tab.id === value);
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        onChange(tabs[next].id);
        listRef.current?.querySelector<HTMLButtonElement>(`#${CSS.escape(tabId(tabs[next].id))}`)?.focus();
    };

    return (
        <>
            <div className="scene-tabs" role="tablist" aria-label={label} ref={listRef} onKeyDown={onKeyDown}>
                {tabs.map((tab) => {
                    const selected = tab.id === value;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            id={tabId(tab.id)}
                            className={`scene-tabs__tab${selected ? " is-selected" : ""}`}
                            aria-selected={selected}
                            aria-controls={panelId}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => onChange(tab.id)}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            {children({ id: panelId, labelledBy: tabId(value) })}
        </>
    );
};

export default SceneTabs;
