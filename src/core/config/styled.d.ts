import 'styled-components';
import { DEFAULT_THEME } from '../utils/constants';

type Theme = typeof DEFAULT_THEME;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
