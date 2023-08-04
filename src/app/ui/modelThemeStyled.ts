import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            main: string;
            mainDark: string;
            secondary: string;
            lightGray: string;
            darkGray: string;
            white: string;
            black: string;
        };
        breakpoints: {
            maxMobile: number;
            maxTablets: number;
            maxLaptops: number;
        };
        font: {
            font4: number;
            font6: number;
            font8: number;
            font10: number;
            font12: number;
            font14: number;
            font16: number;
            font20: number;
            font24: number;
            font28: number;
            font32: number;
            font36: number;
            font40: number;
        };
        spaces: {
            space4: number;
            space6: number;
            space8: number;
            space10: number;
            space12: number;
            space14: number;
            space16: number;
            space20: number;
            space24: number;
            space28: number;
            space32: number;
            space36: number;
            space40: number;
            space44: number;
            space48: number;
            space50: number;
            space52: number;
            space56: number;
            space60: number;
        };
    }
}