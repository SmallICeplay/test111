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

      <!-- Main Menu -->
      <div class="menu-container">
        <ul 
          class="menu-list" 
          ref="menuList"
          @keydown="handleKeyNavigation"
          tabindex="0"
        >
          <li 
            v-for="(item, index) in menuItems" 
            :key="item.id"
            class="menu-item"
            :class="{ 
              'active': activeItem === item.id,
              'has-submenu': item.submenu && item.submenu.length > 0
            }"
            @click="handleMenuClick(item, index)"
            @mouseenter="handleMenuHover(item, index)"
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
        <img
          class="nav-icon"
          referrerpolicy="no-referrer"
          src="../views/lanhu_xinshequshujumianbanshouye/assets/img/SketchPngfb61c5dfa8f8e69dfa7a44b5e4bd7d6abdb5a9ebb597d564c4e51f1922def63f.png"
          alt="Notification"
        />
        <img
          class="nav-icon"
          referrerpolicy="no-referrer"
          src="../views/lanhu_xinshequshujumianbanshouye/assets/img/SketchPng418cb95f38b39c7ccc81b1bd75f9ccd0914eed7b10680ad5857a7eed5cc1b27d.png"
          alt="Settings"
        />
        <div class="login-button">
          <span class="login-text">登录</span>
        </div>
        <div class="language-selector">
          <img
            class="language-icon"
            referrerpolicy="no-referrer"
            src="../views/lanhu_xinshequshujumianbanshouye/assets/img/SketchPng3a00f209d57ed98c3467cf6e7842ec7915f23f7b4dbc268709bbb29be303632a.png"
            alt="Language"
          />
          <span class="language-text">语言/国家地区</span>
          <img
            class="dropdown-icon"
            referrerpolicy="no-referrer"
            src="../views/lanhu_xinshequshujumianbanshouye/assets/img/SketchPng23df6e403090ed096c628a3fd19474e4231f9941150d27fb55a0af072e90914e.png"
            alt="Dropdown"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationMenu',
  data() {
    return {
      activeItem: 'home',
      showSubmenu: null,
      currentFocusIndex: 0,
      indicatorStyle: {
        left: '0px',
        width: '0px',
        opacity: 0
      },
      menuItems: [
        {
          id: 'home',
          label: '首页',
          href: '/'
        },
        {
          id: 'community',
          label: '社区入驻',
          href: '/community',
          submenu: [
            { id: 'apply', label: '申请入驻', href: '/community/apply' },
            { id: 'guide', label: '入驻指南', href: '/community/guide' },
            { id: 'benefits', label: '权益说明', href: '/community/benefits' }
          ]
        },
        {
          id: 'advertising',
          label: '广告投放',
          href: '/advertising',
          submenu: [
            { id: 'banner', label: '横幅广告', href: '/advertising/banner' },
            { id: 'sponsored', label: '赞助内容', href: '/advertising/sponsored' },
            { id: 'pricing', label: '价格方案', href: '/advertising/pricing' }
          ]
        },
        {
          id: 'nft',
          label: '社区NFT',
          href: '/nft'
        },
        {
          id: 'follow',
          label: '关注我们',
          href: '/follow',
          submenu: [
            { id: 'twitter', label: 'Twitter', href: 'https://twitter.com' },
            { id: 'telegram', label: 'Telegram', href: 'https://t.me' },
            { id: 'discord', label: 'Discord', href: 'https://discord.com' }
          ]
        }
      ]
    };
  },
  mounted() {
    this.updateIndicator(0);
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
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
      const menuLength = this.menuItems.length;
      
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
            const currentItem = this.menuItems[this.currentFocusIndex];
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
          const itemRect = item.getBoundingClientRect();
          const menuRect = this.$refs.menuList.getBoundingClientRect();
          
          this.indicatorStyle = {
            left: `${item.offsetLeft}px`,
            width: `${item.offsetWidth}px`,
            opacity: 1
          };
        }
      });
    },
    
    handleResize() {
      const activeIndex = this.menuItems.findIndex(item => item.id === this.activeItem);
      if (activeIndex !== -1) {
        this.updateIndicator(activeIndex);
      }
    }
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
  height: 46px;
  padding: 3px 8px;
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
  transition: all 0.25s ease;
  outline: none;
  z-index: 2;
}

.menu-item:focus {
  outline: 2px solid rgba(0, 102, 255, 0.5);
  outline-offset: 2px;
}

.menu-text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(120, 120, 120, 1);
  white-space: nowrap;
  line-height: 22px;
  transition: all 0.25s ease;
  position: relative;
  z-index: 1;
}

.menu-item.active .menu-text {
  color: rgba(0, 102, 255, 1);
  font-weight: 500;
  font-family: PingFangSC-Medium, sans-serif;
}

.menu-item:hover .menu-text {
  color: rgba(0, 102, 255, 0.8);
  font-weight: 500;
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

/* Responsive Design */
@media (max-width: 1200px) {
  .nav-container {
    width: 98%;
    padding: 0 24px;
  }
  
  .language-text {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 16px 24px;
    gap: 16px;
  }
  
  .menu-container {
    width: 100%;
    justify-content: center;
  }
  
  .right-section {
    justify-content: center;
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
