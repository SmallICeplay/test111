export const translations = {
  'zh-CN': {
    // Navigation
    home: '首页',
    community: '社区入驻',
    advertising: '广告投放',
    nft: '社区NFT',
    follow: '关注我们',
    login: '登录',
    language: '语言/国家地区',
    search: '搜索',
    
    // Submenu items
    apply: '申请入驻',
    guide: '入驻指南',
    benefits: '权益说明',
    banner: '横幅广告',
    sponsored: '赞助内容',
    pricing: '价格方案',
    twitter: 'Twitter',
    telegram: 'Telegram',
    discord: 'Discord',
    
    // Main content cards
    aiAgent: 'XBOT·让每个社区都拥有AI智能体',
    communityActivity: '社区活跃值',
    communityVolume: '社区成交额',
    rewardDistributed: '已发放金额/项',
    starPlanGrowth: '100万群星计划增长曲线',
    premiumFeatures: 'TRY OUR PREMIUM FEATURES',
    premiumDescription: 'Let AI be your guide in unraveling optimal asset analysis and help you to get to know crypto more!',
    seeMoreFeatures: 'See other premium features',
    
    // Data labels
    activeUsers: '活跃',
    traffic: '流量',
    totalUsers: '个',
    people: '人',
    totalAmount: '总计',
    yesterday: '昨日',
    messages: '条消息',
    valuation: '估值',
    trafficValue: '流量值',
    
    // Statistics
    activeDaily: '7日活跃',
    marketMakerPlan: '做市商招商计划',
    marketMakerStart: '开启',
    marketMakerPolicy: '享受专有激励政策',
    marketMakerEmail: '申请发送邮件至',
    
    // Community data
    wechatCommunity: '微信社群',
    tgCommunity: 'TG社群',
    qqCommunity: 'QQ社群',
    adoption: '领养',
    communitySettlement: '社区入驻',
    adPlacement: '广告投放'
  },
  'en-US': {
    // Navigation
    home: 'Home',
    community: 'Community',
    advertising: 'Advertising',
    nft: 'Community NFT',
    follow: 'Follow Us',
    login: 'Login',
    language: 'Language/Region',
    search: 'Search',
    
    // Submenu items
    apply: 'Apply',
    guide: 'Guide',
    benefits: 'Benefits',
    banner: 'Banner Ads',
    sponsored: 'Sponsored Content',
    pricing: 'Pricing',
    twitter: 'Twitter',
    telegram: 'Telegram',
    discord: 'Discord',
    
    // Main content cards
    aiAgent: 'XBOT·Every Community Has AI Agent',
    communityActivity: 'Community Activity',
    communityVolume: 'Community Volume',
    rewardDistributed: 'Rewards Distributed/Projects',
    starPlanGrowth: '1M Star Plan Growth Curve',
    premiumFeatures: 'TRY OUR PREMIUM FEATURES',
    premiumDescription: 'Let AI be your guide in unraveling optimal asset analysis and help you to get to know crypto more!',
    seeMoreFeatures: 'See other premium features',
    
    // Data labels
    activeUsers: 'Active',
    traffic: 'Traffic',
    totalUsers: 'Total',
    people: 'People',
    totalAmount: 'Total',
    yesterday: 'Yesterday',
    messages: 'Messages',
    valuation: 'Valuation',
    trafficValue: 'Traffic Value',
    
    // Statistics
    activeDaily: '7-day Active',
    marketMakerPlan: 'Market Maker Recruitment Plan',
    marketMakerStart: 'Start',
    marketMakerPolicy: 'Enjoy Exclusive Incentive Policies',
    marketMakerEmail: 'Send application email to',
    
    // Community data
    wechatCommunity: 'WeChat Community',
    tgCommunity: 'TG Community',
    qqCommunity: 'QQ Community',
    adoption: 'Adoption',
    communitySettlement: 'Community Settlement',
    adPlacement: 'Ad Placement'
  }
};

export function getTranslation(key, lang = 'zh-CN') {
  return translations[lang]?.[key] || key;
}

export function getCurrentLanguage() {
  const saved = localStorage.getItem('selectedLanguage');
  if (saved) {
    try {
      return JSON.parse(saved).code;
    } catch (e) {
      return 'zh-CN';
    }
  }
  return 'zh-CN';
}
