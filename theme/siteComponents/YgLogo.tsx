import React from "react";

/**
 * N.B.: the logo is kept as inline SVG to work better with styling.
 */
export function YgLogo(): JSX.Element {
  return (
    <svg id="emblem" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path
        id="emblem-path"
        d="M 0.00423975,50.026808 C -0.26884366,69.899279 12.676752,89.014105 31.122925,96.325209 49.260645,103.98115 71.662127,99.466529 85.382103,85.326879 99.707077,71.373944 104.08099,48.498359 95.923691,30.242774 88.13623,11.635388 68.253354,-1.0079237 48.074407,0.06321351 28.03369,0.56199885 9.2870618,14.477961 2.8359922,33.42833 0.95574296,38.746533 7.950684e-4,44.386786 0.00423975,50.026808 Z M 51.376618,2.7907916 C 58.956479,2.9966969 66.476033,5.0754332 73.081867,8.7990792 65.846783,16.034167 58.611702,23.269248 51.376618,30.504333 c 0,-9.237847 0,-18.475696 0,-27.7135414 z M 26.926597,8.7990792 c 6.605716,-3.7239376 14.125404,-5.8023926 21.705257,-6.0082876 0,9.2378454 0,18.4756944 0,27.7135414 C 41.39677,23.269248 34.161684,16.034167 26.926597,8.7990792 Z M 2.7490038,50.026808 C 2.5973865,34.198879 11.145895,18.708785 24.504,10.257921 32.546621,18.300539 40.589237,26.343158 48.631854,34.385772 48.7014,45.174035 48.492712,55.989691 48.736282,66.76082 56.689918,75.057915 64.993377,83.067804 73.081863,91.254189 56.606992,100.79842 34.471128,98.792247 19.9628,86.47748 9.1726738,77.660719 2.6578159,63.976144 2.7490038,50.026808 Z m 73.9394792,9.10644 c 0,-16.029533 0,-32.05907 0,-48.088609 15.490369,10.344853 23.611157,30.360963 19.594189,48.567351 -2.405844,11.845433 -9.616541,22.591499 -19.594189,29.396639 0,-9.958462 0,-19.916921 0,-29.875381 z M 51.945124,33.817263 c 7.332866,-7.33275 14.665729,-14.665505 21.998595,-21.998257 0,14.665507 0,29.331007 0,43.996509 C 66.610853,48.482766 59.27799,41.150013 51.945124,33.817263 Z m -0.568509,31.849895 c 0,-9.512208 0,-19.024413 0,-28.536622 7.522368,7.522368 15.044736,15.044736 22.567104,22.567104 0,9.512092 0,19.024184 0,28.53628 C 66.421351,80.711665 58.898983,73.189413 51.376615,65.667158 Z"
      />
    </svg>
  );
}

export default YgLogo;
