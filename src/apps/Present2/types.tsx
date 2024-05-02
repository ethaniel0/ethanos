
export interface CaptionedImage {
    img: string;
    caption: string;
    index: number;
    id: number;
}
export interface Project {
    displayImg: string;
    displayTitle: string,
    images: CaptionedImage[];
    link: string;
    longDescription: string;
    shortDescription: string;
    title: string;
    year: string;
    id: string;
}