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
      <div class="menu-container desktop-only">
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
          <img
            class="nav-icon"
            referrerpolicy="no-referrer"
            src="../views/lanhu_xinshequshujumianbanshouye/assets/img/SketchPng418cb95f38b39c7ccc81b1bd75f9ccd0914eed7b10680ad5857a7eed5cc1b27d.png"
            alt="Settings"
          />
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
              <img :src="lang.flag" :alt="lang.label" class="language-flag" />
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
  padding: 0px 8px;
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
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  z-index: 2;
  overflow: hidden;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(102, 153, 255, 0.1));
  border-radius: 100px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.menu-item:hover::before {
  opacity: 1;
  transform: scale(1);
}

.menu-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.15);
}

.menu-text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(120, 120, 120, 1);
  white-space: nowrap;
  line-height: 22px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.menu-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(0, 102, 255, 1), rgba(102, 153, 255, 1));
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}

.menu-item:hover .menu-text::after {
  width: 100%;
}

.menu-item.active .menu-text {
  font-weight: 500;
  font-family: PingFangSC-Medium, sans-serif;
  color: rgba(0, 102, 255, 1);
}

.menu-item:hover .menu-text {
  font-weight: 500;
  color: rgba(0, 102, 255, 1);
  transform: scale(1.05);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 102, 255, 0.2);
}

.menu-item.active::before {
  opacity: 1;
  transform: scale(1);
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.15), rgba(102, 153, 255, 0.15));
}

.menu-item.active .menu-text::after {
  width: 100%;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(102, 153, 255, 0.1));
  border-radius: 100px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-button:hover {
  background-color: rgba(0, 102, 255, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.15);
}

.login-button:hover::before {
  opacity: 1;
  transform: scale(1);
}

.login-button:active {
  transform: translateY(0);
}

.login-text {
  font-size: 14px;
  color: rgba(66, 66, 66, 1);
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.login-button:hover .login-text {
  color: rgba(0, 102, 255, 1);
  transform: scale(1.05);
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(248, 249, 250, 1);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.language-selector::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.08), rgba(102, 153, 255, 0.08));
  border-radius: 100px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.language-selector:hover {
  background-color: rgba(240, 240, 240, 1);
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 102, 255, 0.1);
}

.language-selector:hover::before {
  opacity: 1;
  transform: scale(1);
}

.language-text {
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.language-selector:hover .language-text {
  color: rgba(0, 102, 255, 1);
}

.language-icon,
.dropdown-icon {
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.language-selector:hover .language-icon,
.language-selector:hover .dropdown-icon {
  transform: scale(1.1);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-icon-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(0, 102, 255, 0.1), transparent);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-icon-container:hover {
  background-color: rgba(0, 102, 255, 0.1);
  transform: translateY(-1px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.15);
}

.nav-icon-container:hover::before {
  opacity: 1;
  transform: scale(1);
}

.nav-icon-container:active {
  transform: translateY(0) scale(1);
}

.nav-icon-container .nav-icon {
  width: 24px;
  height: 24px;
  color: rgba(66, 66, 66, 1);
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.nav-icon-container:hover .nav-icon {
  color: rgba(0, 102, 255, 1);
  transform: scale(1.1);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 4px solid transparent;
  position: relative;
  overflow: hidden;
}

.mobile-menu-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 102, 255, 0.1), transparent);
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-link:hover::before {
  left: 100%;
}

.mobile-menu-item.active .mobile-menu-link {
  background-color: rgba(0, 102, 255, 0.1);
  border-left-color: rgba(0, 102, 255, 1);
  color: rgba(0, 102, 255, 1);
  font-weight: 500;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 102, 255, 0.15);
}

.mobile-menu-link:hover {
  background-color: rgba(248, 249, 250, 1);
  transform: translateX(2px);
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
