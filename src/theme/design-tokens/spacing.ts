// spacing.ts
import { RFValue } from "react-native-responsive-fontsize"

/** Padding e Margin utilitários estilo Tailwind */
export const spacing = {
	// Padding
	/** 4px */
	p1: RFValue(4),
	/** 8px */
	p2: RFValue(8),
	/** 12px */
	p3: RFValue(12),
	/** 16px */
	p4: RFValue(16),
	/** 20px */
	p5: RFValue(20),
	/** 24px */
	p6: RFValue(24),
	/** 32px */
	p8: RFValue(32),

	// Margin
	/** 4px */
	m1: RFValue(4),
	/** 8px */
	m2: RFValue(8),
	/** 12px */
	m3: RFValue(12),
	/** 16px */
	m4: RFValue(16),
	/** 20px */
	m5: RFValue(20),
	/** 24px */
	m6: RFValue(24),
	/** 32px */
	m8: RFValue(32),

	// Gap (útil em Views com flex)
	/** 4px */
	gap1: RFValue(4),
	/** 8px */
	gap2: RFValue(8),
	/** 12px */
	gap3: RFValue(12),
	/** 16px */
	gap4: RFValue(16),
	/** 20px */
	gap5: RFValue(20),
	/** 24px */
	gap6: RFValue(24),
	/** 32px */
	gap8: RFValue(32),
}

/** Border Radius utilitários estilo Tailwind */
export const radius = {
	/** 2px */
	roundedSm: RFValue(2),
	/** 4px */
	rounded: RFValue(4),
	/** 8px */
	roundedMd: RFValue(8),
	/** 12px */
	roundedLg: RFValue(12),
	/** 16px */
	roundedXl: RFValue(16),
	/** 9999px (full circle) */
	roundedFull: RFValue(9999),
}
