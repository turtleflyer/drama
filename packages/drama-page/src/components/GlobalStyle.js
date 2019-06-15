import React from 'react';
import { css, Global } from '@emotion/core';

const GlobalStyle = () => (
  <Global
    styles={css`
      html {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      main,
      menu,
      nav,
      section,
      summary {
        display: block;
      }
      audio,
      canvas,
      progress,
      video {
        display: inline-block;
      }
      audio:not([controls]) {
        display: none;
        height: 0;
      }
      progress {
        vertical-align: baseline;
      }
      [hidden],
      template {
        display: none;
      }
      a {
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
      }
      a:active,
      a:hover {
        outline-width: 0;
      }
      img {
        border-style: none;
      }
      svg:not(:root) {
        overflow: hidden;
      }
      figure {
        margin: 1em 40px;
      }
      hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }
      button,
      input,
      optgroup,
      select,
      textarea {
        font: inherit;
        margin: 0;
      }
      optgroup {
        font-weight: 700;
      }
      button,
      input {
        overflow: visible;
      }
      button,
      select {
        text-transform: none;
      }
      [type='reset'],
      [type='submit'],
      button,
      html [type='button'] {
        -webkit-appearance: button;
      }
      [type='button']::-moz-focus-inner,
      [type='reset']::-moz-focus-inner,
      [type='submit']::-moz-focus-inner,
      button::-moz-focus-inner {
        border-style: none;
        padding: 0;
      }
      [type='button']:-moz-focusring,
      [type='reset']:-moz-focusring,
      [type='submit']:-moz-focusring,
      button:-moz-focusring {
        outline: 1px dotted ButtonText;
      }
      fieldset {
        border: 1px solid silver;
        margin: 0 2px;
        padding: 0.35em 0.625em 0.75em;
      }
      legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
      }
      textarea {
        overflow: auto;
      }
      [type='checkbox'],
      [type='radio'] {
        box-sizing: border-box;
        padding: 0;
      }
      [type='number']::-webkit-inner-spin-button,
      [type='number']::-webkit-outer-spin-button {
        height: auto;
      }
      [type='search'] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }
      [type='search']::-webkit-search-cancel-button,
      [type='search']::-webkit-search-decoration {
        -webkit-appearance: none;
      }
      ::-webkit-input-placeholder {
        color: inherit;
        opacity: 0.54;
      }
      ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }
      html {
        box-sizing: border-box;
        overflow-y: scroll;
      }
      * {
        box-sizing: inherit;
      }
      *:before {
        box-sizing: inherit;
      }
      *:after {
        box-sizing: inherit;
      }
      body {
        color: hsla(0, 0%, 0%, 0.8);
        word-wrap: break-word;
      }
      img {
        max-width: 100%;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
        margin-bottom: 1.45rem;
      }
      nav {
        color: #a0a0a0;
      }
      nav a {
        color: #742a86;
        text-decoration: none;
      }
      nav ul {
        list-style: none;
        margin: 0.7em 0;
      }
      nav li {
        margin: 0 0 0.3em 0.4em;
      }
    `}
  />
);

export default GlobalStyle;
