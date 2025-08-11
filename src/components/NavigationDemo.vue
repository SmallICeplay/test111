<template>
  <div class="navigation-demo">
    <div class="demo-container">
      <h2 class="demo-title">🎉 增强型导航菜单演示</h2>
      
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>点击选中动画</h3>
          <p>点击菜单项时，底部滑动指示器会平滑移动到目标位置，同时文字变色加粗</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">⌨️</div>
          <h3>键盘导航</h3>
          <p>支持方向键左右切换菜单项，Enter/Space选中，符合无障碍访问标准</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📋</div>
          <h3>二级菜单</h3>
          <p>悬停或点击带有子菜单的项目，展开二级菜单，支持平滑的展开动画</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>视觉反馈</h3>
          <p>不同状态（inactive/active/hover）有清晰的视觉反馈，动画时长 0.2-0.35s</p>
        </div>
      </div>
      
      <div class="usage-instructions">
        <h3>💡 使用方法</h3>
        <ul>
          <li><strong>鼠标操作:</strong> 点击菜单项切换，悬停查看二级菜单</li>
          <li><strong>键盘操作:</strong> Tab聚焦菜单，方向键切换，Enter/Space选择</li>
          <li><strong>二级菜单:</strong> "社区入驻"、"广告投放"、"关注我们"有子菜单</li>
          <li><strong>响应式:</strong> 在不同屏幕尺寸下自动适配布局</li>
        </ul>
      </div>
      
      <div class="tech-specs">
        <h3>🔧 技术规格</h3>
        <div class="spec-grid">
          <div class="spec-item">
            <strong>动画时长:</strong> 0.3s cubic-bezier(0.4, 0, 0.2, 1)
          </div>
          <div class="spec-item">
            <strong>避免重排:</strong> 使用 transform ��� opacity
          </div>
          <div class="spec-item">
            <strong>无障碍:</strong> ARIA标签和键盘导航
          </div>
          <div class="spec-item">
            <strong>兼容性:</strong> 支持现代浏览器
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationDemo'
};
</script>

<style scoped>
.navigation-demo {
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 60vh;
}

.demo-container {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 40px;
  font-weight: 700;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.feature-card {
  background: white;
  padding: 32px 24px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 12px;
  font-size: 1.3rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

.usage-instructions {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.usage-instructions h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.usage-instructions ul {
  list-style: none;
  padding: 0;
}

.usage-instructions li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  color: #555;
  line-height: 1.6;
}

.usage-instructions li:last-child {
  border-bottom: none;
}

.usage-instructions strong {
  color: #0066ff;
  font-weight: 600;
}

.tech-specs {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.tech-specs h3 {
  color: #2c3e50;
  margin-bottom: 24px;
  font-size: 1.5rem;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.spec-item {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #0066ff;
}

.spec-item strong {
  color: #0066ff;
  display: block;
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .demo-title {
    font-size: 2rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .spec-grid {
    grid-template-columns: 1fr;
  }
  
  .usage-instructions,
  .tech-specs {
    padding: 24px;
  }
}
</style>
