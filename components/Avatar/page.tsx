
interface AvatarProps {
    alt: string;
    src: string;
    text?: string;
}

export default function Avatar({ alt, src, text }: AvatarProps) {
    return (
        <div className="flex items-center gap-2">
            <img className="w-12 h-12 rounded-full" alt={alt} src={src} title={alt} />
            {text && <strong className="text-lg font-semibold">{text}</strong>}
        </div>
    )
}