import { extendTheme } from 'native-base';

export const THEME = extendTheme({
    colors: {
        purple: {
            900: '#241C34',
            700: '#8956F1',
        },
        pink: {
            500: '#CB80FF',
        },
        gray: {
            700: '#121214',
            600: '#202024',
            500: '#29292E',
            400: '#323238',
            300: '#7C7C8A',
            200: '#C7C7C721',
            100: '#D9D9D933'
        },
        white: '#FFFFFF',
        red: {
            500: '#F75A68'
        }
    },
    fonts: {
        heading: 'Barlow_700Bold',
        body: 'Barlow_400Regular',
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
    },
    sizes: {
        14: 56,
        33: 148
    }
});
