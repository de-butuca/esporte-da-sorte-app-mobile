export type AndroidShadow = {
	elevation: number;
};

export type IosShadow = {
	shadowColor: string;
	shadowOffset: { width: number; height: number };
	shadowOpacity: number;
	shadowRadius: number;
};

export type Shadow = AndroidShadow | IosShadow;

export type Shadows = {
	level1: Shadow;
	level2: Shadow;
};
