import type { ReactElement } from "react";

export type AccordionGalleryItem = {
    image: string;
    label?: string;
    alt?: string;
    link?: string;
};

export type AccordionGalleryProps = {
    items?: AccordionGalleryItem[];
    defaultIndex?: number;
    accentColor?: string;
    overlayColor?: string;
    textColor?: string;
    height?: number;
    gap?: number;
    radius?: number;
    expandRatio?: number;
    orientation?: "horizontal" | "vertical";
    duration?: number;
    ease?: string;
    parallax?: number;
    tilt?: number;
    stagger?: number;
    trigger?: "hover" | "click";
    showLabels?: boolean;
    grayscale?: boolean;
    className?: string;
};

declare function AccordionGallery(props: AccordionGalleryProps): ReactElement;
export default AccordionGallery;
