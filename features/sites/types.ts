type Site = {
    id: number;
    hero_section_title: string;
    hero_section_body: string;
    theme_main_color: string;
    theme_secondary_color: string;
    font_main_color: string;
    font_secondary_color: string;
    facebook_url?: string;
    instagram_url?: string;
    whatsapp_url?: string;
    linkedin_url?: string;
    twitter_url?: string;
    tiktok_url?: string;
    email?: string;
    google_maps_url?: string;
    spotify_url?: string;
    youtube_url?: string;
    behance_url?: string;
    subdomain_name: string;
    subdomain_url: string;
    status: SiteStatus;
    text_alignment: SiteAlignment;
    hero_section_logo: string;
    hero_section_photo: string;
    landing_page_sections: Section[]
}

export type Section = {
    title: string;
    body: string;
    theme_main_color: string;
    theme_secondary_color: string;
    font_main_color: string;
    font_secondary_color: string;
    name: string;
    status: SectionStatus;
    type: SectionType;
}

export type SiteStatus = "active" | "inactive" | "draft";

export type SectionStatus = SiteStatus;

export type SiteAlignment = "left_to_right" | "right_to_left";

export enum SectionType {
    SINGLE_PHOTO = "single_photo",
    STACKED_CAROUSEL = "stacked_carousel",
    FLAT_CAROUSEL = "flat_carousel",
    VIDEO = "video",
    IFRAME = "iframe",
    TEXT_ONLY = "text_only",
    FORM = "form"
}

export default Site;