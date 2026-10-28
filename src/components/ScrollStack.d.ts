import type { CSSProperties, ReactNode } from "react";

export type ScrollStackItemProps = {
    children?: ReactNode;
    itemClassName?: string;
    style?: CSSProperties;
};

export declare const ScrollStackItem: (props: ScrollStackItemProps) => JSX.Element;

export type ScrollStackProps = {
    children?: ReactNode;
    className?: string;
    itemDistance?: number;
    itemStackDistance?: number;
    stackPosition?: number | string;
    itemScale?: number;
    baseScale?: number;
    dimAmount?: number;
    blurAmount?: number;
    tiltAmount?: number;
    mobileTiltAmount?: number;
    depthAmount?: number;
    mobileDepthAmount?: number;
    liftAmount?: number;
    mobileLiftAmount?: number;
    rotationAmount?: number;
    holdDistance?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
};

declare const ScrollStack: (props: ScrollStackProps) => JSX.Element;
export default ScrollStack;
