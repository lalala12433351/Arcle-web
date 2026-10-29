declare module '@/components/MaskedHeading' {
    import { ReactNode, CSSProperties, ElementType } from 'react';

    export interface MaskedHeadingProps {
        text: string;
        mediaType?: 'video' | 'image';
        src?: string;
        maskOnly?: boolean;
        maskTarget?: React.RefObject<HTMLElement | null>;
        poster?: string;
        fillScale?: number;
        parallax?: number;
        reveal?: 'scale' | 'rise' | 'fade' | 'none';
        trigger?: 'view' | 'load';
        scrollProgress?: { current: number };
        spotlight?: boolean;
        spotlightRadius?: number;
        outline?: boolean;
        duration?: number;
        stagger?: number;
        drift?: number;
        hoverZoom?: number;
        align?: 'left' | 'center' | 'right';
        brightness?: number;
        saturation?: number;
        grayscale?: boolean;
        tint?: string;
        outlineWidth?: number;
        weight?: number;
        tracking?: number;
        lineHeight?: number;
        textScale?: number;
        tag?: string;
        className?: string;
        style?: CSSProperties;
        children?: ReactNode;
    }

    const MaskedHeading: React.FC<MaskedHeadingProps>;
    export default MaskedHeading;
}
