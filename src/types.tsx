export interface CharacterPartial {
    id: string;
    name: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    gender: "Female" | "Male" | "Genderless" | "unknown"
    image: string;
};

export interface EpisodePartial {
    id: string;
    name: string;
    air_date: string;
    episode: string;
};

export interface LocationPartial {
    id: string;
    name: string;
    dimension: string;
};

export interface Character extends CharacterPartial {
    origin: LocationPartial;
    location: LocationPartial;
    episode: EpisodePartial[];
};

export interface Episode extends EpisodePartial {
    characters: CharacterPartial[]
};

export interface Location extends LocationPartial {
    residents: CharacterPartial[]
};