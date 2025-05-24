import Svg, { SvgProps, Path } from "react-native-svg"

interface SearchProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
}

export const Search = ({ width = 32, height = 32, color = "#F7F7F7", ...props }: SearchProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
            <Path stroke={color} d="M22.0931 22.0961L31 31M25.7294 13.3488C25.7294 6.52874 20.1935 1 13.3647 1C6.53587 1 1 6.52874 1 13.3488C1 20.1688 6.53587 25.6975 13.3647 25.6975C20.1935 25.6975 25.7294 20.1688 25.7294 13.3488Z" strokeWidth="1.5" strokeLinecap="round" />
        </Svg>
    );
}; 