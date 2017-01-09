// Import app styles
import 'font-awesome/scss/font-awesome.scss';
// import '../public/fonts/fonts.scss';
import '../public/styles/app.scss';
import 'angular-material/angular-material.min.css';

import 'jquery';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularMessages from 'angular-messages';
import angularSanitize from 'angular-sanitize';
import angularAria from 'angular-aria';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import {
    featureNames,
    serviceNames,
    modelNames,
    filterNames,
    directiveNames,
    componentNames
} from './autoloader';

const moduleName = 'app.core';

angular.module(moduleName, [
    // 3rd party
    uirouter,
    angularMessages,
    angularSanitize,
    angularAria,
    angularAnimate,
    angularMaterial,

    // local
    ...componentNames,
    ...featureNames,
    ...serviceNames,
    ...modelNames,
    ...filterNames,
    ...directiveNames
]);

export default moduleName;
