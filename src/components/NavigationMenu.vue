<template>
  <nav class="main-navigation" role="navigation">
    <div class="nav-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <img
          class="logo-image"
          referrerpolicy="no-referrer"
          src="../views/lanhu_xinshequshujumianbanshouye/assets/img/SketchPngafa39c6a8d96a5b7aea126e112d692bbfbfdf10f29ea7fa6f0249de24b354cc7.png"
          alt="XBOT Logo"
        />
        <span class="logo-text">XBOT</span>
      </div>

      <!-- Desktop Menu -->
      <div class="menu-container desktop-only" style="zoom: 1.2;">
        <ul
          class="menu-list"
          ref="menuList"
          @keydown="handleKeyNavigation"
          tabindex="0"
        >
          <li
            v-for="(item, index) in translatedMenuItems"
            :key="item.id"
            class="menu-item"
            :class="{
              'active': activeItem === item.id,
              'has-submenu': item.submenu && item.submenu.length > 0
            }"
            @click="handleMenuClick(item, index)"
            @mouseenter="handleMenuHover(item)"
            @mouseleave="handleMenuLeave"
            @keydown.enter="handleMenuClick(item, index)"
            @keydown.space.prevent="handleMenuClick(item, index)"
            :tabindex="0"
            :aria-current="activeItem === item.id ? 'page' : false"
            :aria-expanded="item.submenu && showSubmenu === item.id ? 'true' : 'false'"
            :aria-haspopup="item.submenu ? 'true' : 'false'"
          >
            <span class="menu-text">{{ item.label }}</span>

            <!-- Submenu -->
            <div
              v-if="item.submenu && item.submenu.length > 0"
              class="submenu"
              :class="{ 'submenu-visible': showSubmenu === item.id }"
            >
              <ul class="submenu-list" role="menu">
                <li
                  v-for="subItem in item.submenu"
                  :key="subItem.id"
                  class="submenu-item"
                  @click.stop="handleSubmenuClick(subItem)"
                  role="menuitem"
                  tabindex="0"
                >
                  {{ subItem.label }}
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <!-- Sliding Indicator -->
        <div
          class="sliding-indicator"
          ref="slidingIndicator"
          :style="indicatorStyle"
        ></div>
      </div>

      <!-- Right Section -->
      <div class="right-section">
        <!-- Expandable Search -->
        <div class="search-container" :class="{ 'search-expanded': showSearch }">
          <input
            v-if="showSearch"
            ref="searchInput"
            class="search-input"
            :placeholder="currentLanguage.code === 'zh-CN' ? '搜索...' : 'Search...'"
            v-model="searchQuery"
            @blur="handleSearchBlur"
            @keydown.enter="performSearch"
          />
          <div class="nav-icon-container search-button" @click="toggleSearch">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <!-- Notification Icon -->


        <!-- Settings Icon -->
        <div class="nav-icon-container">
          <svg t="1754981394024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6892" width="24" height="24"><path d="M593.861938 788.582269 424.670537 788.582269c-9.444093 0-18.437931 3.931542-24.695448 10.902304-6.313799 6.970762-9.441023 16.32378-8.547677 25.675776 2.860141 29.191856 16.32378 56.238862 38.009685 76.018348 21.772886 20.016893 50.161447 31.0379 79.889515 31.0379 29.696346 0 58.084906-11.022031 79.830163-30.977525 21.714558-19.839861 35.178197-46.885843 38.068014-76.255755 0.595564-9.473769-2.534729-18.707061-8.638751-25.498744C612.299869 792.513812 603.306031 788.582269 593.861938 788.582269zM555.020304 863.825974c-25.082258 22.877033-66.604954 22.817682-91.567485 0.060375-7.596002-6.970762-13.404288-15.429411-17.157775-24.723078l125.82266 0C568.394916 848.51629 562.643935 856.914564 555.020304 863.825974z" fill="#231F20" p-id="6893"></path><path d="M818.608631 648.343271l-62.763462-82.927711 0-36.22197 0-13.046131L755.845169 410.432767c0-70.745251-24.215518-136.337131-68.182892-184.682209-26.003234-28.625968-57.310264-49.715285-93.055372-62.821791-3.306302-18.944468-12.720719-36.251645-26.926256-49.207725-32.050973-29.251208-85.104283-29.251208-117.095905 0-14.356986 13.046131-23.77038 30.382984-26.986631 49.2681-35.71441 13.046131-67.022463 34.135448-93.025697 62.791092-43.937698 48.434106-68.183915 114.025986-68.183915 184.652534l0.179079 154.686035-62.315254 82.45085c-8.757454 9.353019-13.582343 21.506826-13.582343 34.256198l0 40.331567c0 27.643594 22.460548 50.042743 50.042743 50.042743l544.812313 0c27.610848 0 50.011021-22.400173 50.011021-50.042743l0-40.331567C831.535035 669.075455 826.739822 656.921647 818.608631 648.343271zM535.776008 149.881612c-7.387247-0.655939-19.301602-1.906419-26.569122-1.906419-7.29822 0-19.689435 1.251503-27.048029 1.906419C494.578724 129.627313 526.542716 133.379777 535.776008 149.881612zM237.426992 722.156394l-0.119727-40.034808 62.315254-82.449827c8.698103-9.354042 13.524015-21.447475 13.524015-34.256198L313.146535 410.432767c0-58.056254 19.540032-111.553679 54.986335-150.634766 17.574261-19.361977 38.307468-34.374902 61.540611-44.681642 48.851615-21.745257 110.302175-21.745257 159.096485 0 23.321148 10.425444 43.99398 25.438369 61.538565 44.681642 35.449373 39.081087 54.958706 92.578512 54.958706 150.634766l0 105.715717 0 13.046131 0 36.22197c0 12.867052 4.825912 25.081235 12.95608 33.539884l62.791092 82.868359 0.508583 39.795355L237.426992 722.156394z" fill="#231F20" p-id="6894"></path></svg>
        </div>

        <!-- Login Button -->
        <div class="login-button">
          <span class="login-text">{{ translatedLoginText }}</span>
        </div>

        <!-- Language Selector -->
        <div class="language-selector" @click="toggleLanguageMenu">
          <img
            class="language-icon"
            referrerpolicy="no-referrer"
            src="../views/lanhu_xinshequshujumianbanshouye/assets/img/SketchPng3a00f209d57ed98c3467cf6e7842ec7915f23f7b4dbc268709bbb29be303632a.png"
            alt="Language"
          />
          <span class="language-text">{{ currentLanguage.label }}</span>
          <img
            class="dropdown-icon"
            :class="{ 'dropdown-rotated': showLanguageMenu }"
            referrerpolicy="no-referrer"
            src="../views/lanhu_xinshequshujumianbanshouye/assets/img/SketchPng23df6e403090ed096c628a3fd19474e4231f9941150d27fb55a0af072e90914e.png"
            alt="Dropdown"
          />

          <!-- Language Menu -->
          <div style="zoom: .5;font-size: 29px;" class="language-menu" :class="{ 'language-menu-visible': showLanguageMenu }">
            <div
              v-for="lang in languages"
              :key="lang.code"
              class="language-option"
              :class="{ 'language-active': currentLanguage.code === lang.code }"
              @click.stop="selectLanguage(lang)"
            >
              <svg v-if="lang.flag === '🇨🇳'"  t="1754982099500" class="icon" viewBox="0 0 1536 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16753" id="mx_n_1754982099501" width="24" height="24"><path d="M0 0h1536v1024H0z" fill="#D8231D" p-id="16754"></path><path d="M626.7392 261.5808a165.4784 165.4784 0 0 1 14.3872 14.0288l14.2848 15.0016 36.608-17.664a163.84 163.84 0 0 1-8.96 18.432c-3.072 6.0416-6.2976 11.9808-9.5232 18.176l28.8768 30.0032a25.6 25.6 0 0 1-3.072 0l-34.9184-6.5536c-3.3792-0.6144-3.3792-0.512-5.12 2.6112l-16.1792 30.72-1.9456 3.2256-1.2288-8.2944c-1.536-10.24-2.9184-20.48-4.3008-30.72-0.4096-2.4576-0.4096-2.5088-2.9184-3.0208l-35.84-6.5536a5.12 5.12 0 0 1-1.8432-0.7168c5.9904-3.3792 12.1344-6.144 18.176-9.1136l18.5344-8.9088-5.12-40.3968zM502.016 170.6496l0.6144-0.512 37.3248 15.36 26.7264-31.6416v4.3008l-2.304 33.9456c0 3.3792 0 3.3792 2.9184 4.608l32.7168 13.2096c0.768 0 1.3824 0.6144 2.7136 1.1776l-3.072 1.0752-34.56 8.448c-2.9184 0.6144-2.9184 0.6144-3.1744 3.6864l-2.4576 37.0176-0.3072 1.8432-2.0992-3.2256c-6.144-9.8304-12.288-19.712-18.5856-29.5424-1.6896-2.7648-1.792-2.7648-5.12-1.8944l-34.2016 8.3456-2.9184 0.5632c9.0624-10.9056 17.8176-21.1968 26.7264-31.7952l-21.0432-34.6112z m-63.488 144.0768L357.5808 374.4768l-1.9968 1.4848c-2.304 1.792-2.304 1.792-1.3824 4.6592l22.1184 67.584 10.24 31.4368 0.768 2.5088h-0.6144l-1.792-1.2288-86.016-62.976-0.768-0.4608h-0.7168L209.0496 482.4576l-0.6144-0.4608 33.5872-105.0112-88.4736-64.3584v-0.768h105.3184c4.608 0 3.84 0.5632 5.12-3.84l32.256-96.2048a9.472 9.472 0 0 1 1.6896-3.2768l33.536 103.2704c6.0416 0.3072 12.1344 0 18.1248 0h91.4432v0.6656z m161.2288 253.9008l-34.2528 8.2944-3.2256 0.9216-2.816 41.6768-1.9968-2.816-18.7392-29.7984c-1.792-2.816-1.8432-2.816-5.12-2.048l-34.1504 8.448-3.072 0.512 26.7776-31.8464-21.0432-34.56 0.4096-0.512c6.3488 2.1504 12.4416 5.12 18.688 7.424l18.8928 7.68 26.2144-31.1296h0.512v3.4816l-2.304 33.8432v1.2288a2.56 2.56 0 0 0 1.9968 3.1744l14.1312 5.6832 19.6608 7.8848 2.7136 1.1264-3.2256 1.0752z m99.1744-122.4704l-27.0336 21.0432c-2.6624 2.048-2.6624 2.048-1.536 5.12l11.6736 32.6144a6.4512 6.4512 0 0 1 0.3584 3.2256l-33.792-23.3984-32.4608 25.1904-0.512-0.4096 11.4176-39.4752-33.4848-23.04v-0.768c13.4144-0.6656 26.88-0.512 40.704-1.28l11.8272-38.8096h0.512l1.2288 3.072 11.52 32.3584c1.024 2.9184 1.024 2.9184 4.096 2.816l34.2528-1.024h3.2256v0.6144z" fill="#FFFA30" p-id="16755"></path></svg>
              <svg  v-if="lang.flag === '🇺🇸'" t="1754982221294" class="icon" viewBox="0 0 1588 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19158" width="24" height="24"><path d="M0 0h1588.476v1024H0" fill="#FFFFFF" p-id="19159"></path><path d="M0 80.558h1588.476V0H0m0 157.146h1588.476v80.558H0m0 76.587h1588.476v80.559H0m0 76.587h1588.476v80.559H0m0 77.154h1588.476v79.991H0m0 77.155h1588.476v80.558H0M0 1024h1588.476v-80.558H0" fill="#E50012" p-id="19160"></path><path d="M0 551.996h688.15V0H0" fill="#1E2380" p-id="19161"></path><path d="M56.731 66.376l17.02 13.048-6.24-20.99L84.53 45.951H62.972l-6.24-20.423-6.808 20.423H28.366l17.586 12.481-6.807 20.99L56.73 66.377z m114.598 0l17.586 13.048-6.808-20.99 17.587-12.482h-21.558L171.33 25.53l-6.24 20.423H143.53l17.02 12.481-6.24 20.99 17.019-13.047z m115.164 0l17.587 13.048-6.808-20.99 17.587-12.482H293.3l-6.808-20.423-6.808 20.423h-21.558l17.587 12.481-6.808 20.99 17.587-13.047z m115.165 0l17.019 13.048-6.24-20.99 17.019-12.482h-21.558l-6.24-20.423-6.808 20.423h-21.558l17.587 12.481-6.808 20.99 17.587-13.047z m114.597 0l17.587 13.048-6.808-20.99 17.586-12.482h-21.557l-6.808-20.423-6.808 20.423h-20.99l17.019 12.481-6.24 20.99 17.019-13.047z m115.164 0l17.587 13.048-6.808-20.99 17.02-12.482h-20.99l-6.809-20.423-6.807 20.423h-21.558l17.586 12.481-6.807 20.99 17.586-13.047z m-517.39 55.596l17.588 12.481-6.808-20.423 17.587-12.481h-21.558l-6.808-20.423-6.808 20.423H85.664l17.587 12.48-6.808 20.424 17.587-12.48z m115.165 0l17.02 12.481-6.24-20.423 17.019-12.481h-20.99l-6.809-20.423-6.807 20.423h-21.558l17.587 12.48-6.808 20.424 17.586-12.48z m114.598 0l17.586 12.481-6.807-20.423 17.586-12.481H350.6l-6.807-20.423-6.24 20.423h-21.559l17.02 12.48-6.24 20.424 17.019-12.48z m115.164 0l17.587 12.481-6.808-20.423 17.587-12.481h-21.558l-6.808-20.423-6.808 20.423h-21.557l17.586 12.48-6.807 20.424 17.586-12.48z m115.165 0l17.02 12.481-6.809-20.423 17.587-12.481h-21.558l-6.24-20.423-6.808 20.423h-21.558l17.587 12.48-6.808 20.424 17.587-12.48zM56.73 177.57l17.02 12.48-6.24-20.422 17.019-12.481H62.972l-6.24-20.424-6.808 20.424H28.366l17.586 12.48-6.807 20.424 17.586-12.481z m114.598 0l17.586 12.48-6.808-20.422 17.587-12.481h-21.558l-6.807-20.424-6.24 20.424H143.53l17.02 12.48-6.24 20.424 17.019-12.481z m115.164 0l17.587 12.48-6.808-20.422 17.587-12.481H293.3l-6.808-20.424-6.808 20.424h-21.558l17.587 12.48-6.808 20.424 17.587-12.481z m115.165 0l17.019 12.48-6.24-20.422 17.019-12.481h-21.558l-6.24-20.424-6.808 20.424h-21.558l17.587 12.48-6.808 20.424 17.587-12.481z m114.597 0l17.587 12.48-6.808-20.422 17.586-12.481h-21.557l-6.808-20.424-6.808 20.424h-20.99l17.019 12.48-6.24 20.424 17.019-12.481z m115.164 0l17.587 12.48-6.808-20.422 17.02-12.481h-20.99l-6.809-20.424-6.807 20.424h-21.558l17.586 12.48-6.807 20.424 17.586-12.481z m-517.39 55.597l17.588 12.48-6.808-20.423 17.587-12.48h-21.558l-6.808-20.424-6.808 20.423H85.664l17.587 12.481-6.808 20.424 17.587-12.481z m115.165 0l17.02 12.48-6.24-20.423 17.019-12.48h-20.99l-6.809-20.424-6.807 20.423h-21.558l17.587 12.481-6.808 20.424 17.586-12.481z m114.598 0l17.586 12.48-6.807-20.423 17.586-12.48H350.6l-6.807-20.424-6.24 20.423h-21.559l17.02 12.481-6.24 20.424 17.019-12.481z m115.164 0l17.587 12.48-6.808-20.423 17.587-12.48h-21.558l-6.808-20.424-6.808 20.423h-21.557l17.586 12.481-6.807 20.424 17.586-12.481z m115.165 0l17.02 12.48-6.809-20.423 17.587-12.48h-21.558l-6.24-20.424-6.808 20.423h-21.558l17.587 12.481-6.808 20.424 17.587-12.481zM56.73 288.762l17.02 12.481-6.24-20.423 17.019-12.48H62.972l-6.24-20.424-6.808 20.423H28.366l17.586 12.48-6.807 20.424 17.586-12.48z m114.598 0l17.586 12.481-6.808-20.423 17.587-12.48h-21.558l-6.807-20.424-6.24 20.423H143.53l17.02 12.48-6.24 20.424 17.019-12.48z m115.164 0l17.587 12.481-6.808-20.423 17.587-12.48H293.3l-6.808-20.424-6.808 20.423h-21.558l17.587 12.48-6.808 20.424 17.587-12.48z m115.165 0l17.019 12.481-6.24-20.423 17.019-12.48h-21.558l-6.24-20.424-6.808 20.423h-21.558l17.587 12.48-6.808 20.424 17.587-12.48z m114.597 0l17.587 12.481-6.808-20.423 17.586-12.48h-21.557l-6.808-20.424-6.808 20.423h-20.99l17.019 12.48-6.24 20.424 17.019-12.48z m115.164 0l17.587 12.481-6.808-20.423 17.02-12.48h-20.99l-6.809-20.424-6.807 20.423h-21.558l17.586 12.48-6.807 20.424 17.586-12.48zM114.03 344.36l17.588 12.48-6.808-20.422 17.587-12.481h-21.558l-6.808-20.424-6.808 20.424H85.664l17.587 12.48-6.808 20.424 17.587-12.481z m115.165 0l17.02 12.48-6.24-20.422 17.019-12.481h-20.99l-6.809-20.424-6.807 20.424h-21.558l17.587 12.48-6.808 20.424 17.586-12.481z m114.598 0l17.586 12.48-6.807-20.422 17.586-12.481H350.6l-6.807-20.424-6.24 20.424h-21.559l17.02 12.48-6.24 20.424 17.019-12.481z m115.164 0l17.587 12.48-6.808-20.422 17.587-12.481h-21.558l-6.808-20.424-6.808 20.424h-21.557l17.586 12.48-6.807 20.424 17.586-12.481z m115.165 0l17.02 12.48-6.809-20.422 17.587-12.481h-21.558l-6.24-20.424-6.808 20.424h-21.558l17.587 12.48-6.808 20.424 17.587-12.481zM56.73 399.956l17.02 12.48-6.24-20.423 17.019-13.048H62.972l-6.24-19.856-6.808 19.856H28.366l17.586 13.048-6.807 20.424 17.586-12.481z m114.598 0l17.586 12.48-6.808-20.423 17.587-13.048h-21.558l-6.807-19.856-6.24 19.856H143.53l17.02 13.048-6.24 20.424 17.019-12.481z m115.164 0l17.587 12.48-6.808-20.423 17.587-13.048H293.3l-6.808-19.856-6.808 19.856h-21.558l17.587 13.048-6.808 20.424 17.587-12.481z m115.165 0l17.019 12.48-6.24-20.423 17.019-13.048h-21.558l-6.24-19.856-6.808 19.856h-21.558l17.587 13.048-6.808 20.424 17.587-12.481z m114.597 0l17.587 12.48-6.808-20.423 17.586-13.048h-21.557l-6.808-19.856-6.808 19.856h-20.99l17.019 13.048-6.24 20.424 17.019-12.481z m115.164 0l17.587 12.48-6.808-20.423 17.02-13.048h-20.99l-6.809-19.856-6.807 19.856h-21.558l17.586 13.048-6.807 20.424 17.586-12.481z m-517.39 55.596l17.588 12.481-6.808-20.423 17.587-13.048h-21.558l-6.808-20.423-6.808 20.423H85.664l17.587 13.048-6.808 20.423 17.587-12.48z m115.165 0l17.02 12.481-6.24-20.423 17.019-13.048h-20.99l-6.809-20.423-6.807 20.423h-21.558l17.587 13.048-6.808 20.423 17.586-12.48z m114.598 0l17.586 12.481-6.807-20.423 17.586-13.048H350.6l-6.807-20.423-6.24 20.423h-21.559l17.02 13.048-6.24 20.423 17.019-12.48z m115.164 0l17.587 12.481-6.808-20.423 17.587-13.048h-21.558l-6.808-20.423-6.808 20.423h-21.557l17.586 13.048-6.807 20.423 17.586-12.48z m115.165 0l17.02 12.481-6.809-20.423 17.587-13.048h-21.558l-6.24-20.423-6.808 20.423h-21.558l17.587 13.048-6.808 20.423 17.587-12.48z m-517.39 55.03l17.02 13.048-6.24-20.423 17.019-13.049H62.972l-6.24-20.423-6.808 20.423H28.366l17.586 13.049-6.807 20.423 17.586-13.048z m114.598 0l17.586 13.048-6.808-20.423 17.587-13.049h-21.558l-6.807-20.423-6.24 20.423H143.53l17.02 13.049-6.24 20.423 17.019-13.048z m115.164 0l17.587 13.048-6.808-20.423 17.587-13.049H293.3l-6.808-20.423-6.808 20.423h-21.558l17.587 13.049-6.808 20.423 17.587-13.048z m115.165 0l17.019 13.048-6.24-20.423 17.019-13.049h-21.558l-6.24-20.423-6.808 20.423h-21.558l17.587 13.049-6.808 20.423 17.587-13.048z m114.597 0l17.587 13.048-6.808-20.423 17.586-13.049h-21.557l-6.808-20.423-6.808 20.423h-20.99l17.019 13.049-6.24 20.423 17.019-13.048z m115.164 0l17.587 13.048-6.808-20.423 17.02-13.049h-20.99l-6.809-20.423-6.807 20.423h-21.558l17.586 13.049-6.807 20.423 17.586-13.048z" fill="#FFFFFF" p-id="19162"></path></svg>
              <span>{{ lang.label }}</span>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="mobile-menu-button mobile-only" @click="toggleMobileMenu">
          <svg class="menu-icon" :class="{ 'menu-icon-open': showMobileMenu }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path v-if="!showMobileMenu" d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path v-else d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" :class="{ 'overlay-visible': showMobileMenu }" @click="closeMobileMenu">
      <div class="mobile-menu" :class="{ 'mobile-menu-visible': showMobileMenu }" @click.stop>
        <div class="mobile-menu-header">
          <span class="mobile-menu-title">菜单</span>
          <button class="mobile-menu-close" @click="closeMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <ul class="mobile-menu-list">
          <li
            v-for="item in translatedMenuItems"
            :key="item.id"
            class="mobile-menu-item"
            :class="{ 'active': activeItem === item.id }"
          >
            <div class="mobile-menu-link" @click="handleMobileMenuClick(item)">
              <span>{{ item.label }}</span>
              <svg v-if="item.submenu && item.submenu.length > 0"
                class="mobile-submenu-icon"
                :class="{ 'submenu-expanded': mobileExpandedItem === item.id }"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <!-- Mobile Submenu -->
            <ul v-if="item.submenu && item.submenu.length > 0"
              class="mobile-submenu"
              :class="{ 'mobile-submenu-visible': mobileExpandedItem === item.id }">
              <li
                v-for="subItem in item.submenu"
                :key="subItem.id"
                class="mobile-submenu-item"
                @click="handleSubmenuClick(subItem)"
              >
                {{ subItem.label }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getTranslation } from '@/utils/translations.js';

export default {
  name: 'NavigationMenu',
  data() {
    return {
      activeItem: 'home',
      showSubmenu: null,
      showMobileMenu: false,
      showLanguageMenu: false,
      showSearch: false,
      searchQuery: '',
      mobileExpandedItem: null,
      currentFocusIndex: 0,
      indicatorStyle: {
        left: '0px',
        width: '0px',
        opacity: 0
      },
      currentLanguage: {
        code: 'zh-CN',
        label: '中文',
        flag: '🇨🇳'
      },
      languages: [
        {
          code: 'zh-CN',
          label: '中文',
          flag: '🇨🇳'
        },
        {
          code: 'en-US',
          label: 'English',
          flag: '🇺🇸'
        }
      ],
      menuItems: []
    };
  },
  computed: {
    translatedMenuItems() {
      return [
        {
          id: 'home',
          label: getTranslation('home', this.currentLanguage.code),
          href: '/'
        },
        {
          id: 'community',
          label: getTranslation('community', this.currentLanguage.code),
          // href: '/community',
          submenu: [
            // { id: 'apply', label: getTranslation('apply', this.currentLanguage.code), href: '/community/apply' },
            // { id: 'guide', label: getTranslation('guide', this.currentLanguage.code), href: '/community/guide' },
            // { id: 'benefits', label: getTranslation('benefits', this.currentLanguage.code), href: '/community/benefits' }
          ]
        },
        {
          id: 'advertising',
          label: getTranslation('advertising', this.currentLanguage.code),
          // href: '/advertising',
          submenu: [
            // { id: 'banner', label: getTranslation('banner', this.currentLanguage.code), href: '/advertising/banner' },
            // { id: 'sponsored', label: getTranslation('sponsored', this.currentLanguage.code), href: '/advertising/sponsored' },
            // { id: 'pricing', label: getTranslation('pricing', this.currentLanguage.code), href: '/advertising/pricing' }
          ]
        },
        {
          id: 'nft',
          label: getTranslation('nft', this.currentLanguage.code),
          // href: '/nft'
        },
        {
          id: 'follow',
          label: getTranslation('follow', this.currentLanguage.code),
          // href: '/follow',
          submenu: [
            // { id: 'twitter', label: getTranslation('twitter', this.currentLanguage.code), href: 'https://twitter.com' },
            // { id: 'telegram', label: getTranslation('telegram', this.currentLanguage.code), href: 'https://t.me' },
            // { id: 'discord', label: getTranslation('discord', this.currentLanguage.code), href: 'https://discord.com' }
          ]
        }
      ];
    },

    translatedLoginText() {
      return getTranslation('login', this.currentLanguage.code);
    }
  },
  mounted() {
    this.updateIndicator(0);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    handleMenuClick(item, index) {
      this.activeItem = item.id;
      this.currentFocusIndex = index;
      this.updateIndicator(index);
      
      if (item.submenu && item.submenu.length > 0) {
        this.showSubmenu = this.showSubmenu === item.id ? null : item.id;
      } else {
        this.showSubmenu = null;
        this.$emit('navigate', item);
      }
    },
    
    handleMenuHover(item) {
      if (item.submenu && item.submenu.length > 0) {
        this.showSubmenu = item.id;
      }
    },
    
    handleMenuLeave() {
      setTimeout(() => {
        this.showSubmenu = null;
      }, 200);
    },
    
    handleSubmenuClick(subItem) {
      this.showSubmenu = null;
      this.$emit('navigate', subItem);
    },
    
    handleKeyNavigation(event) {
      const { key } = event;
      const menuLength = this.translatedMenuItems.length;
      
      switch (key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.currentFocusIndex = this.currentFocusIndex > 0 ? 
            this.currentFocusIndex - 1 : menuLength - 1;
          this.focusMenuItem();
          break;
          
        case 'ArrowRight':
          event.preventDefault();
          this.currentFocusIndex = this.currentFocusIndex < menuLength - 1 ? 
            this.currentFocusIndex + 1 : 0;
          this.focusMenuItem();
          break;
          
        case 'Enter':
        case ' ':
          event.preventDefault();
          {
            const currentItem = this.translatedMenuItems[this.currentFocusIndex];
            this.handleMenuClick(currentItem, this.currentFocusIndex);
          }
          break;
          
        case 'Escape':
          this.showSubmenu = null;
          break;
      }
    },
    
    focusMenuItem() {
      const menuItems = this.$refs.menuList.querySelectorAll('.menu-item');
      if (menuItems[this.currentFocusIndex]) {
        menuItems[this.currentFocusIndex].focus();
        this.updateIndicator(this.currentFocusIndex);
      }
    },
    
    updateIndicator(index) {
      this.$nextTick(() => {
        const menuItems = this.$refs.menuList.querySelectorAll('.menu-item');
        if (menuItems[index]) {
          const item = menuItems[index];

          this.indicatorStyle = {
            left: `${item.offsetLeft}px`,
            width: `${item.offsetWidth}px`,
            opacity: 1
          };
        }
      });
    },
    
    handleResize() {
      const activeIndex = this.translatedMenuItems.findIndex(item => item.id === this.activeItem);
      if (activeIndex !== -1) {
        this.updateIndicator(activeIndex);
      }
    },

    // Mobile Menu Methods
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
      if (this.showMobileMenu) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        this.mobileExpandedItem = null;
      }
    },

    closeMobileMenu() {
      this.showMobileMenu = false;
      document.body.style.overflow = '';
      this.mobileExpandedItem = null;
    },

    handleMobileMenuClick(item) {
      if (item.submenu && item.submenu.length > 0) {
        this.mobileExpandedItem = this.mobileExpandedItem === item.id ? null : item.id;
      } else {
        this.activeItem = item.id;
        this.closeMobileMenu();
        this.$emit('navigate', item);
      }
    },

    // Language Methods
    toggleLanguageMenu() {
      this.showLanguageMenu = !this.showLanguageMenu;
    },

    selectLanguage(language) {
      this.currentLanguage = language;
      this.showLanguageMenu = false;

      // Emit language change event for parent components
      this.$emit('language-change', language);

      // Store in localStorage for persistence
      localStorage.setItem('selectedLanguage', JSON.stringify(language));

      // Force update of computed properties
      this.$forceUpdate();

      console.log('Language changed to:', language.label);
    },

    handleGlobalClick(event) {
      // Close language menu when clicking outside
      if (!event.target.closest('.language-selector')) {
        this.showLanguageMenu = false;
      }
    },

    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        this.$nextTick(() => {
          this.$refs.searchInput?.focus();
        });
      } else {
        this.searchQuery = '';
      }
    },

    handleSearchBlur() {
      if (!this.searchQuery.trim()) {
        setTimeout(() => {
          this.showSearch = false;
        }, 150);
      }
    },

    performSearch() {
      if (this.searchQuery.trim()) {
        this.$emit('search-query', this.searchQuery.trim());
        console.log('Search query:', this.searchQuery);
      }
    },

    // Load saved language on component creation
    loadSavedLanguage() {
      const saved = localStorage.getItem('selectedLanguage');
      if (saved) {
        try {
          this.currentLanguage = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved language:', e);
        }
      }
    }
  },

  created() {
    this.loadSavedLanguage();
  }
};
</script>

<style scoped>
.main-navigation {
  position: relative;
  width: 100%;
  z-index: 1000;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 100px;
  box-shadow: 0px 2px 4px 0px rgba(236, 243, 255, 1);
  width: 95%;
  max-width: 1440px;
  height: 72px;
  margin: 22px auto 0 auto;
  padding: 0 46px;
  box-sizing: border-box;
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-image {
  width: 48px;
  height: 48px;
}

.logo-text {
  font-size: 24px;
  font-family: SFProDisplay-Heavy, sans-serif;
  font-weight: 900;
  color: rgba(1, 4, 9, 1);
  white-space: nowrap;
  line-height: 24px;
}

/* Menu Container */
.menu-container {
  position: relative;
  background-color: rgba(248, 249, 250, 1);
  border-radius: 100px;
  height: 43px;
  padding: 0px 0px;
}

.menu-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 40px;
  position: relative;
  outline: none;
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  height: 40px;
  padding: 0 16px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  z-index: 2;
}

.menu-item:hover {
  background-color: rgba(0, 102, 255, 0.05);
}

.menu-text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(120, 120, 120, 1);
  white-space: nowrap;
  line-height: 22px;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.menu-item.active .menu-text {
  font-weight: 500;
  font-family: PingFangSC-Medium, sans-serif;
  color: rgba(0, 102, 255, 1);
}

.menu-item:hover .menu-text {
  font-weight: 500;
  color: rgba(0, 102, 255, 1);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 1);
}

/* Sliding Indicator */
.sliding-indicator {
  position: absolute;
  bottom: 0;
  height: 40px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 100px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 102, 255, 0.15);
}

/* Submenu Styles */
.submenu {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(-8px);
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 180px;
  z-index: 1000;
}

.submenu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.submenu-list {
  list-style: none;
  margin: 0;
  padding: 8px 0;
}

.submenu-item {
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
  color: rgba(66, 66, 66, 1);
  transition: all 0.18s ease;
  outline: none;
}

.submenu-item:hover {
  background-color: rgba(248, 249, 250, 1);
  color: rgba(0, 102, 255, 1);
}

.submenu-item:focus {
  background-color: rgba(0, 102, 255, 0.1);
  color: rgba(0, 102, 255, 1);
  outline: none;
}

/* Right Section */
.right-section {
  display: flex;
  align-items: center;
  gap: 16px;
  zoom: 1.2;
}

.nav-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.nav-icon:hover {
  transform: scale(1.1);
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 20px;
  background-color: rgba(248, 249, 250, 1);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-button:hover {
  background-color: rgba(0, 102, 255, 0.1);
}

.login-text {
  font-size: 14px;
  color: rgba(66, 66, 66, 1);
  font-weight: 500;
  transition: color 0.2s ease;
}

.login-button:hover .login-text {
  color: rgba(0, 102, 255, 1);
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(248, 249, 250, 1);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-selector:hover {
  background-color: rgba(240, 240, 240, 1);
}

.language-text {
  transition: color 0.2s ease;
}

.language-selector:hover .language-text {
  color: rgba(0, 102, 255, 1);
}

.language-icon {
  width: 20px;
  height: 20px;
}

.language-text {
  font-size: 14px;
  color: rgba(66, 66, 66, 1);
  white-space: nowrap;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
}

/* Mobile/Desktop visibility */
.desktop-only {
  display: flex !important;
}

.mobile-only {
  display: none !important;
}

/* Search Container */
.search-container {
  display: flex;
  align-items: center;
  background-color: rgba(248, 249, 250, 1);
  border-radius: 100px;
  height: 40px;
  width: 40px;
  transition: width 0.3s ease;
  overflow: hidden;
  position: relative;
}

.search-expanded {
  width: 250px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0 16px 0 20px;
  font-size: 14px;
  color: rgba(66, 66, 66, 1);
}

.search-input::placeholder {
  color: rgba(120, 120, 120, 1);
}

.search-button {
  position: absolute;
  right: 0;
  background-color: rgba(248, 249, 250, 1);
  border-radius: 50%;
}

/* Nav icon containers */
.nav-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.nav-icon-container:hover {
  background-color: rgba(0, 102, 255, 0.1);
}

.nav-icon-container .nav-icon {
  width: 24px;
  height: 24px;
  color: rgba(66, 66, 66, 1);
  transition: color 0.2s ease;
}

.nav-icon-container:hover .nav-icon {
  color: rgba(0, 102, 255, 1);
}

/* Language Menu */
.language-selector {
  position: relative;
}

.language-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.25s ease;
  min-width: 160px;
  z-index: 1000;
  border: 1px solid rgba(240, 240, 240, 1);
}

.language-menu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.language-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.18s ease;
  border-radius: 8px;
  margin: 4px;
}

.language-option:hover {
  background-color: rgba(248, 249, 250, 1);
}

.language-option.language-active {
  background-color: rgba(0, 102, 255, 0.1);
  color: rgba(0, 102, 255, 1);
}

.language-flag {
  width: 20px;
  height: 20px;
  border-radius: 2px;
}

.dropdown-icon {
  transition: transform 0.2s ease;
}

.dropdown-rotated {
  transform: rotate(180deg);
}

/* Mobile Menu Button */
.mobile-menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(248, 249, 250, 1);
  transition: background-color 0.2s ease;
}

.mobile-menu-button:hover {
  background-color: rgba(240, 240, 240, 1);
}

.menu-icon {
  width: 24px;
  height: 24px;
  color: rgba(66, 66, 66, 1);
  transition: transform 0.2s ease;
}

.menu-icon-open {
  transform: rotate(90deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 9999;
}

.overlay-visible {
  opacity: 1;
  visibility: visible;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.mobile-menu-visible {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
}

.mobile-menu-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(1, 4, 9, 1);
}

.mobile-menu-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.mobile-menu-close:hover {
  background-color: rgba(248, 249, 250, 1);
}

.mobile-menu-close svg {
  width: 20px;
  height: 20px;
  color: rgba(66, 66, 66, 1);
}

.mobile-menu-list {
  list-style: none;
  margin: 0;
  padding: 16px 0;
}

.mobile-menu-item {
  margin: 0;
}

.mobile-menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  font-size: 16px;
  color: rgba(66, 66, 66, 1);
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}

.mobile-menu-item.active .mobile-menu-link {
  background-color: rgba(0, 102, 255, 0.1);
  border-left-color: rgba(0, 102, 255, 1);
  color: rgba(0, 102, 255, 1);
  font-weight: 500;
}

.mobile-menu-link:hover {
  background-color: rgba(248, 249, 250, 1);
  color: rgba(0, 102, 255, 1);
}

.mobile-submenu-icon {
  width: 20px;
  height: 20px;
  color: rgba(120, 120, 120, 1);
  transition: transform 0.2s ease;
}

.submenu-expanded {
  transform: rotate(90deg);
}

.mobile-submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: rgba(248, 249, 250, 1);
}

.mobile-submenu-visible {
  max-height: 300px;
}

.mobile-submenu-item {
  padding: 12px 20px 12px 40px;
  cursor: pointer;
  font-size: 14px;
  color: rgba(66, 66, 66, 1);
  transition: background-color 0.2s ease;
  list-style: none;
}

.mobile-submenu-item:hover {
  background-color: rgba(240, 240, 240, 1);
  color: rgba(0, 102, 255, 1);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .nav-container {
    width: 98%;
    padding: 0 24px;
  }

  .language-text {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .nav-container {
    height: 60px;
    padding: 0 16px;
  }

  .logo-text {
    font-size: 20px;
  }

  .right-section {
    gap: 12px;
  }

  .login-button {
    padding: 0 16px;
    height: 36px;
  }

  .login-text {
    font-size: 13px;
  }

  .language-selector {
    padding: 6px 12px;
  }

  .language-text {
    display: none;
  }

  .search-container {
    width: 36px;
    height: 36px;
  }

  .search-expanded {
    width: 200px;
  }

  .search-input {
    font-size: 13px;
    padding: 0 12px 0 16px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .menu-item,
  .menu-text,
  .sliding-indicator,
  .submenu {
    transition: none;
  }
}

/* Focus management */
.menu-item:focus-visible {
  outline: 2px solid rgba(0, 102, 255, 1);
  outline-offset: 2px;
}

/* Hover states for better UX */
.has-submenu::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 12px;
  z-index: 999;
}
</style>
