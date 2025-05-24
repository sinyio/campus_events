import Svg, { Path, Rect } from "react-native-svg"

interface FeedIconProps {
    width?: number;
    height?: number;
    color?: string;
}

export const Feed: React.FC<FeedIconProps> = ({
    width = 30,
    height = 30,
    color = "#4790FF",
}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
            <Rect x="7.5" y="0.5" width="22" height="29" stroke={color} />
            <Rect x="0.5" y="5.5" width="13" height="15" stroke={color} fill={color} />
        </Svg>
    );
}; 