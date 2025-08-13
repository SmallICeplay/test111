<template>
  <div class="page flex-col">
    <div class="block_1 flex-col">
      <NavigationMenu
        @navigate="handleNavigation"
        @language-change="handleLanguageChange"
        @search-query="handleSearchQuery"
      />
      <div class="box_101 flex-col">
        <div class="section_61 flex-row justify-between">
          <div
            v-for="(image, index) in sectionImages"
            :key="index"
            class="image-container flex-col"
          >
            <img
              class="section-image"
              referrerpolicy="no-referrer"
              :src="image.url"
              :alt="image.alt"
              @load="onImageLoad(index)"
              @error="onImageError(index)"
            />
          </div>
        </div>
        <div class="section_62 flex-row">
          <span class="text_30">100万“群星计划”数据看板</span>
          <div class="box_7 flex-row"
               :class="{ selected_social: selectedSocialIndex === 0 }"
               @click="handleSocialClick(0, '微信社群')">
            <svg v-if=" selectedSocialIndex === 0" style="max-width: 1.8vw;max-height: 1.8vw;margin-top: 4px;margin-left: 11px;" t="1755073325047" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7958" width="24" height="24"><path d="M512 0Q294 5 149.5 149.5T0 512q5 218 149.5 362.5T512 1024q218-5 362.5-149.5T1024 512q-5-218-149.5-362.5T512 0z m-74 523q0 1-1 2l-12 38-3 50 8 42-12 1h-22q-10 0-21-2l-12-2-46-9-7 4-4-2-80 41 32-80-46-40-32-43-21-58-3-50 9-47 28-57 30-35 28-23 35-20 43-17 23-6 23-4q17-1 34-1h2q17 0 34 1l13 2 26 6 30 9 29 13 31 19 41 36 10 11 19 30 22 57-14-1h-23q-10 1-19 2l-20 4-20 6-28 11-28 17-35 30-18 22-19 38-4 5z m434 72v11l-3 19-26 59-31 39-29 26 20 68-69-41-6 2-45 10-16 1h-20q-9 0-19-1l-11-2-16-3-22-7-30-13-28-17-31-28-20-26-24-59-4-55 4-22 25-59 30-37 42-31 37-16 29-8 20-4q14-1 29-1h1q14 0 27 1l11 2 16 3 21 7 30 13 29 18 32 29 20 26q1 0 1 1l25 61 4 34h-3z m-287-83q-10 0-17.5 7.5T560 537q0 10 7.5 17.5T585 562q15 0 23.5-7.5T617 537q0-10-8.5-17.5T585 512z m140 0q-10 0-17.5 7.5T700 537q0 10 7.5 17.5T725 562q15 0 23.5-7.5T757 537q0-10-8.5-17.5T725 512zM324 327q-15 0-26 8.5t-11 23q0 14.5 11 23t26 8.5q15 0 23.5-8.5t8.5-23q0-14.5-8.5-23T324 327z m179 0q-15 0-26.5 8.5t-11.5 23q0 14.5 11.5 23t26 8.5q14.5 0 23-8.5t8.5-23q0-14.5-8.5-23T503 327z" fill="#ffffff" p-id="7959"></path></svg>
            <svg v-if=" selectedSocialIndex !== 0" style="max-width: 1.8vw;max-height: 1.8vw;margin-top: 4px;margin-left: 11px;"  t="1755073512768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8541" width="24" height="24"><path d="M669.03 317.396c10.18 0 20.235 0.748 30.237 1.865C672.1 192.728 536.831 98.731 382.415 98.731 209.797 98.73 68.38 216.39 68.38 365.797c0 86.242 47.044 157.061 125.674 211.988l-31.406 94.468L272.403 617.2c39.303 7.781 70.81 15.765 110.01 15.765 9.85 0 19.626-0.482 29.324-1.243-6.144-20.996-9.698-42.983-9.698-65.793 0.002-137.196 117.806-248.533 266.99-248.533z m-168.862-85.14c23.639 0 39.302 15.55 39.302 39.186 0 23.536-15.664 39.3-39.302 39.3-23.536 0-47.147-15.765-47.147-39.3 0-23.635 23.612-39.185 47.147-39.185z m-219.765 78.487c-23.538 0-47.3-15.765-47.3-39.3 0-23.635 23.764-39.185 47.3-39.185 23.534 0 39.2 15.55 39.2 39.185 0 23.535-15.666 39.3-39.2 39.3z" p-id="8542" fill="#515151"></path><path d="M955.618 562.147c0-125.543-125.622-227.882-266.734-227.882-149.413 0-267.09 102.339-267.09 227.882 0 125.77 117.677 227.88 267.09 227.88 31.279 0 62.838-7.898 94.243-15.766l86.12 47.17-23.612-78.473c63.04-47.286 109.983-109.993 109.983-180.81z m-353.311-39.289c-15.639 0-31.431-15.549-31.431-31.416 0-15.652 15.792-31.405 31.43-31.405 23.74 0 39.304 15.754 39.304 31.405 0 15.867-15.563 31.416-39.303 31.416z m172.72 0c-15.538 0-31.201-15.549-31.201-31.416 0-15.652 15.664-31.405 31.202-31.405 23.536 0 39.3 15.754 39.3 31.405 0.001 15.867-15.764 31.416-39.3 31.416z" p-id="8543" fill="#515151"></path></svg>
            <span class="text_31">微信社群</span>
          </div>
          <div class="box_8 flex-row"
               :class="{ selected_social: selectedSocialIndex === 1 }"
               @click="handleSocialClick(1, 'TG社群')">
            <svg v-if=" selectedSocialIndex === 1" style="max-width: 1.8vw;max-height: 1.8vw;margin-top: 4px;margin-left: 11px;" t="1755073571661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10563" width="24" height="24"><path d="M512 16C238 16 16 238 16 512s222 496 496 496 496-222 496-496S786 16 512 16z m243.6 339.8l-81.4 383.6c-6 27.2-22.2 33.8-44.8 21l-124-91.4-59.8 57.6c-6.6 6.6-12.2 12.2-25 12.2l8.8-126.2 229.8-207.6c10-8.8-2.2-13.8-15.4-5l-284 178.8-122.4-38.2c-26.6-8.4-27.2-26.6 5.6-39.4l478.2-184.4c22.2-8 41.6 5.4 34.4 39z" p-id="10564" fill="#ffffff"></path></svg>
            <svg v-if=" selectedSocialIndex !== 1" style="max-width: 1.8vw;max-height: 1.8vw;margin-top: 4px;margin-left: 11px;" t="1755073629736" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10821" width="24" height="24"><path d="M417.28 795.733333l11.946667-180.48 327.68-295.253333c14.506667-13.226667-2.986667-19.626667-22.186667-8.106667L330.24 567.466667 155.306667 512c-37.546667-10.666667-37.973333-36.693333 8.533333-55.466667l681.386667-262.826666c31.146667-14.08 61.013333 7.68 49.066666 55.466666l-116.053333 546.56c-8.106667 38.826667-31.573333 48.213333-64 30.293334L537.6 695.466667l-84.906667 82.346666c-9.813333 9.813333-17.92 17.92-35.413333 17.92z" fill="#515151" p-id="10822"></path></svg>
            <span class="text_31">TG社群</span>
          </div>
          <div class="box_9 flex-row"
               :class="{ selected_social: selectedSocialIndex === 2 }"
               @click="handleSocialClick(2, 'QQ社群')">
            <svg v-if=" selectedSocialIndex === 2" style="max-width: 1.8vw;max-height: 1.8vw;margin-top: 4px;margin-left: 11px;" t="1755073746154" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15415" width="24" height="24"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m193.1 587.3c-11.5-2.8-41.1-54.9-41.1-54.9s2.4 64.8-49.8 105.3c29 7.7 37.3 18.9 37.3 24.8 0 9.8-35.3 9.2-78.5 9.2-14.3 0-28-0.3-39.9-0.9-11.3 1.3-18.4 0.9-18.4 0.9h-5.9s-10.3 0.5-25.7-2.1c-14.3 1.6-33.4 2.1-53.8 2.1-42 0-76.4 0.6-76.4-9.3 0-8.4 11.1-21.7 53-28.7-47.8-40.6-45.6-101.9-45.6-101.9s-29.6 52.1-41.1 54.9c-5.9 1.4-8.4-21.9-3.5-51.7 4.9-29.8 12.9-51.1 12.9-51.1s11.2-35.8 17.6-53.6c5.5-15.2 18-45.4 18-45.4S352.7 308 443 255c50.9-25.3 94.6-18.2 122.5-6.7 5.3 1.9 10.5 4.5 16.1 7.2 90.3 52.9 78.8 193.9 78.8 193.9s12.5 30.2 18 45.4c6.4 17.8 17.6 53.6 17.6 53.6s8 21.3 12.9 51.1c4.6 29.9 2.1 53.3-3.8 51.8z" fill="#ffffff" p-id="15416"></path></svg>
            <svg v-if=" selectedSocialIndex !== 2" style="max-width: 1.8vw;max-height: 1.8vw;margin-top: 4px;margin-left: 11px;"  t="1755073785846" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15685" width="24" height="24"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="15686" fill="#515151"></path></svg>
            <span class="text_31">QQ社群</span>
          </div>
          <div class="box_10 flex-row justify-between"
               :class="{ selected_social: selectedSocialIndex === 3 }"
               @click="handleSocialClick(3, 'Twitter')">

            <svg v-if=" selectedSocialIndex === 3" style="max-width: 1.8vw;max-height: 1.8vw;margin-top: 4px;margin-left: 11px;"  t="1754981564986" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11502" width="28" height="28"><path d="M1024 512c0-282.760533-229.239467-512-512-512C229.239467 0 0 229.239467 0 512c0 282.760533 229.239467 512 512 512 282.760533 0 512-229.239467 512-512zM649.4208 273.066667h73.284267l-160.085334 202.410666L750.933333 750.933333h-147.456l-115.5072-167.048533L355.84 750.933333H282.487467l171.246933-216.507733L273.066667 273.066667h151.210666l104.379734 152.712533L649.4208 273.066667z m-25.736533 429.329066h40.618666L402.193067 319.044267h-43.554134l265.045334 383.351466z" p-id="11503" fill="#ffffff"></path></svg>
            <svg v-if=" selectedSocialIndex !== 3" style="max-width: 1.8vw;max-height: 1.8vw;margin-top: 4px;margin-left: 11px;" t="1755073916585" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26112" width="24" height="24"><path d="M683.776 256h91.605L575.275 472.875 810.667 768h-184.32L481.963 589.013 316.8 768h-91.69l214.058-231.979L213.333 256h189.014L532.82 419.584 683.776 256z m-32.17 460.032h50.773L374.74 305.237H320.3l331.306 410.795z" p-id="26113" fill="#515151"></path></svg>
            <span class="text_31">Twitter</span>
          </div>
          <div class="box_12 flex-row"
               :class="{ selected_social: selectedSocialIndex === 4 }"
               @click="handleSocialClick(4, '领养')">
            <img
              class="label_6"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPng16435c75284141b535b25f0b8b047600dcd8b7200fec507b4091ec139faa5cbc.png"
            />
            <span class="text_35">领养</span>
          </div>
          <div class="box_13 flex-row"
               :class="{ selected_social: selectedSocialIndex === 5 }"
               @click="handleSocialClick(5, '社区入驻')">
            <img
              class="label_7"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPng48efd877c0c8da7cf6940f6ef72ff8b5514270988b5acc7159a64f7b4f364f64.png"
            />
            <span class="text_36">社区入驻</span>
          </div>
          <div class="box_14 flex-row"
               :class="{ selected_social: selectedSocialIndex === 6 }"
               @click="handleSocialClick(6, '广告投放')">
            <img
              class="label_8"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPng4e7e9141f1569378508bf0ca98f74b6366763c683b011a42870e335a6b59bae5.png"
            />
            <span class="text_37">广告投放</span>
          </div>
        </div>
        <div class="section_63 flex-row justify-between">
          <div class="box_15 flex-col">
            <div class="image-text_82 flex-row justify-between">
              <img
                class="label_9"
                referrerpolicy="no-referrer"
                src="./assets/img/SketchPng783d2bf31248cdbe4b3f5f9a270415706745d3fd78f7c40a746b1922523d971c.png"
              />
              <span class="text-group_1">{{ t('aiAgent') }}</span>
            </div>
            <div class="group_12 flex-col"></div>
            <div class="group_13 flex-col">
              <div class="group_95 flex-row justify-between">
                <div class="group_14 flex-col">
                  <div class="box_17 flex-col">
                    <div class="section_64 flex-row justify-between">
                      <div class="text-wrapper_133 flex-col">
                        <span class="text_38">R</span>
                        <span class="text_39">E</span>
                        <span class="text_40">S</span>
                        <span class="text_41">U</span>
                        <span class="text_42">P</span>
                      </div>
                      <div class="text-wrapper_134 flex-col">
                        <span class="text_43">T</span>
                        <span class="text_44">W</span>
                        <span class="text_45">O</span>
                        <span class="text_46">R</span>
                        <span class="text_47">K</span>
                      </div>
                    </div>
                    <div class="section_65 flex-row"><div class="box_18 flex-col"></div></div>
                    <div class="text-wrapper_135 flex-row">
                      <span class="text_48">R</span>
                      <span class="text_49">A</span>
                      <span class="text_50">R</span>
                      <span class="text_51">E</span>
                      <span class="text_52">A</span>
                      <span class="text_53">R</span>
                    </div>
                  </div>
                  <img
                    class="image_5"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPngbf9db5e18646a626f2a54693a9c91df4a25edb202ef792f57c371924cf4725e6.png"
                  />
                </div>
                <div class="group_15 flex-col">
                  <div class="image-wrapper_1 flex-col">
                    <img
                      class="label_10"
                      referrerpolicy="no-referrer"
                      src="./assets/img/SketchPng9f2a65b4069c114d306cc57380daf0e56bea69a5fea3b1ad533f9585526dab9f.png"
                    />
                  </div>
                </div>
              </div>
              <div class="text-wrapper_136 flex-row justify-between">
                <span class="text_54"></span>
                <span class="text_55">{{data.zfgrq}}/{{data.yjrsq}}</span>
              </div>
              <div class="group_96 flex-row">
                <img
                  class="label_11"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng5ea2687da6e62f49399f9e69fb994a8dc93b40223f2b92070511f637c129bc86.png"
                />
                <img
                  class="image_6"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng196c7cba5e4eeae7c1290595aa2df27b6eee995a465efce271535783554de1c4.png"
                />
                <span class="text_56">总覆盖人数/已接入社区</span>
              </div>
              <div class="box_20 flex-col">
                <div class="text-wrapper_137 flex-row"><span class="text_57">RWA/DWA流���交易数据估值</span></div>
                <div class="group_97 flex-row justify-between">
                  <div class="text-wrapper_138 flex-col justify-between">
                    <span class="text_58">$30k</span>
                    <span class="text_59">$15k</span>
                    <span class="text_60">$0</span>
                  </div>
                  <div class="group_98 flex-col justify-between">
                    <div class="box_21 flex-row">
                      <div class="image-text_83 flex-row justify-between">
                        <img
                          class="thumbnail_2"
                          referrerpolicy="no-referrer"
                          src="./assets/img/SketchPng8c0f12e9e2df78086f994d775dd132184a2555d62aa73a7efcb7bb50bb4929eb.png"
                        />
                        <span class="text-group_2">+12.3%</span>
                      </div>
                    </div>
                    <div class="box_22 flex-col">
                      <div class="image-wrapper_2 flex-col">
                        <img
                          class="thumbnail_3"
                          referrerpolicy="no-referrer"
                          src="./assets/img/SketchPng985c1816230fc2b0b2d12c726d137916d1b7c427084054858a64a2a2b3e29293.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="group_99 flex-col justify-between">
            <div class="block_60 flex-row justify-between">
              <div class="block_44 flex-col">
                <div class="box_102 flex-row justify-between">
                  <div class="image-text_84 flex-row justify-between">
                    <img
                      class="label_44"
                      referrerpolicy="no-referrer"
                      src="./assets/img/SketchPngf3dc389db700312e5c91b4017122a8c5bfd94b8f599d0cb43d3471de3661f96c.png"
                    />
                    <span class="text-group_45">{{ t('communityActivity') }}</span>
                  </div>
                  <div class="section_40 flex-row">
                    <div
                      class="text-wrapper_87 flex-col"
                      :class="{ 'selected': communityActivityTab === 'active' }"
                      @click="switchCommunityActivityTab('active')"
                    >
                      <span class="text_234">{{ t('activeUsers') }}</span>
                    </div>
                    <div
                        class="text-wrapper_87 flex-col"
                        :class="{ 'selected': communityActivityTab === 'traffic' }"
                      @click="switchCommunityActivityTab('traffic')"
                    >
                      <span class="text_234">{{ t('traffic') }}</span>



                    </div>
                  </div>
                </div>
                <div class="box_103 flex-row justify-between">
                  <div class="group_100 flex-col justify-between">
                    <div class="text-wrapper_139 flex-row justify-between">
                      <span class="text_236 animated-number">{{ animatedCommunityActivityNumber1 }}</span>
<!--                      <span class="text_237">{{ communityActivityTab === 'active' ? (currentLanguage === 'zh-CN' ? '个' : '') : (currentLanguage === 'zh-CN' ? '个' : '') }}</span>-->
                    </div>
                    <div class="text-wrapper_140 flex-row justify-between">
                      <span class="text_238">$</span>
                      <span class="text_239 animated-number">{{ animatedCommunityActivityNumber2 }}{{ communityActivityTab === 'active' ? (currentLanguage === 'zh-CN' ? '人次' : ' visits') : (currentLanguage === 'zh-CN' ? '次' : ' times') }}</span>
                    </div>
                  </div>
                  <img
                    class="image_27"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPngd76410150ea4a54f9b585e1c2c55edab584ae299df60a0da0665bc80f8965b90.png"
                  />
                </div>
                <img
                  class="image_28"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPngf69f42dad53ea29364d85a834252fc758c76ff154208b83363df923dcad55e26.png"
                />
                <div class="text-wrapper_141 flex-row">
                  <span class="text_240">Price&nbsp;per&nbsp;1&nbsp;BTC</span>
                  <span class="text_241">$</span>
                  <span class="text_242">43.419,20</span>
                </div>
              </div>
              <div class="block_45 flex-col">
                <div class="box_74 flex-row">
                  <div class="image-text_85 flex-row justify-between">
                    <img
                      class="label_45"
                      referrerpolicy="no-referrer"
                      src="./assets/img/SketchPng09597c5a90173111c6d3f749a1f2a6119ef905391868851208d2ef5778017849.png"
                    />
                    <span class="text-group_46">{{ t('communityVolume') }}</span>
                  </div>
                  <div class="group_74 flex-row">
                    <div
                      class="text-wrapper_87 flex-col"
                      :class="{ 'selected': communityVolumeTab === 'total' }"
                      @click="switchCommunityVolumeTab('total')"
                    >
                      <span class="text_243">{{ t('totalAmount') }}</span>
                    </div>

                    <div
                        class="text-wrapper_87 flex-col"
                        :class="{ 'selected': communityVolumeTab === 'yesterday' }"
                        @click="switchCommunityVolumeTab('yesterday')"
                    >
                      <span class="text_243">{{ t('yesterday') }}</span>


                  </div>
                  </div>
                </div>
                <div class="box_104 flex-row">
                  <div class="block_61 flex-col justify-between">
                    <span class="text_245 animated-number">{{ animatedCommunityVolumeNumber1 }}</span>
                    <div class="text-wrapper_142 flex-row justify-between">
                      <span class="text_246">$</span>
                      <span class="text_247 animated-number">{{ animatedCommunityVolumeNumber2 }}</span>
                    </div>
                  </div>
                  <span class="text_248 animated-number">{{ animatedCommunityVolumeNumber3 }}</span>
                  <img
                    class="image_29"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPngc407f73f0b7f40cfcf4c1752f660f3af43de2b86c2b70f76af1fb8fc1bb28cd6.png"
                  />
                </div>
                <img
                  class="image_30"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPngf69f42dad53ea29364d85a834252fc758c76ff154208b83363df923dcad55e26.png"
                />
                <div class="text-wrapper_143 flex-row">
                  <span class="text_249">Price&nbsp;per&nbsp;1&nbsp;ETH</span>
                  <span class="text_250">$</span>
                  <span class="text_251">2.279,63</span>
                </div>
              </div>
              <div class="block_46 flex-col">
                <div class="section_41 flex-row">
                  <div class="image-text_86 flex-row justify-between">
                    <img
                      class="label_46"
                      referrerpolicy="no-referrer"
                      src="./assets/img/SketchPngc0270809502d793d150502d64b2d936ec49953e4e647cfb25693d6f25186205d.png"
                    />
                    <span class="text-group_47">{{ t('rewardDistributed') }}</span>
                  </div>
                  <div class="text-wrapper_94 flex-col"><span class="text_252">总计</span></div>
                </div>
                <div class="text-wrapper_144 flex-row justify-between">
                  <span class="text_253">0</span>
                  <span class="text_254">XING</span>
                </div>
                <div class="text-wrapper_145 flex-row justify-between">
                  <span class="text_255">T</span>
                  <span class="text_256">202651287120012</span>
                </div>
                <img
                  class="image_31"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng15efe29033803e6b869373b8c73bfc502c85a0ffc7cb1c9665a1431e441f88ff.png"
                />
                <div class="text-wrapper_146 flex-row">
                  <span class="text_257">Price&nbsp;per&nbsp;1&nbsp;XING</span>
                  <span class="text_258">$</span>
                  <span class="text_259">0,00</span>
                </div>
              </div>
            </div>
            <div class="block_62 flex-row justify-between">
              <div class="section_42 flex-col">
                <div class="block_63 flex-row">
                  <img
                    class="label_47"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPng1a6587281fd5ff900127711527e4992820360231b3889af53a82d88dab539e3f.png"
                  />
                  <span class="text_260">{{ t('starPlanGrowth') }}</span>
                  <div class="box_77 flex-row">
                    <div class="image-text_87 flex-row justify-between">
                      <span class="text-group_48">This&nbsp;Month</span>
                      <img
                        class="thumbnail_84"
                        referrerpolicy="no-referrer"
                        src="./assets/img/SketchPng0d58fda905091a9414dee53ddb99b4d8a938f53d97027253c072d53101a4c9d4.png"
                      />
                    </div>
                  </div>
                </div>
                <div class="block_64 flex-row justify-between">
                  <span class="text_261">Balance</span>
                  <img
                    class="image_32"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPngf474b34f7174d44142d77ac6c211c11a5ebbee414042b109b3f368e88f07479a.png"
                  />
                </div>
                <div class="block_65 flex-row justify-between">
                  <div class="section_46 flex-row">
                    <img
                      class="thumbnail_85"
                      referrerpolicy="no-referrer"
                      src="./assets/img/SketchPng8c0f12e9e2df78086f994d775dd132184a2555d62aa73a7efcb7bb50bb4929eb.png"
                    />
                    <span class="text_262">+12.3%</span>
                  </div>
                  <img
                    class="image_33"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPng8d6f85d3168e90b724b91f90909092d6fb2b86aafb9c99071e887d7b9caa17a7.png"
                  />
                </div>
                <div class="block_66 flex-row justify-between">
                  <div class="box_78 flex-row justify-center">
                    <div class="image-text_88 flex-row justify-between">
                      <img
                        class="thumbnail_86"
                        referrerpolicy="no-referrer"
                        src="./assets/img/SketchPngb60505e06892052336e0013a0de1febe162332b34b4123bd04de7fc3852451ea.png"
                      />
                      <span class="text-group_49">新增流量</span>
                    </div>
                  </div>
                  <img
                    class="image_34"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPngd2f38cd3204a03a0bd62810f16e1aef95128082d61311aef1807c935fe83aca9.png"
                  />
                </div>
                <div class="text-wrapper_147 flex-row justify-between">
                  <span class="text_263">Week&nbsp;1</span>
                  <span class="text_264">Week&nbsp;2</span>
                  <span class="text_265">Week&nbsp;3</span>
                  <span class="text_266">Week&nbsp;4</span>
                </div>
                <div class="text-wrapper_148 flex-row justify-between">
                  <span class="text_267">$</span>
                  <span class="text_268">231,238.21</span>
                </div>
                <div class="block_67 flex-row justify-between">
                  <div class="box_105 flex-row">
                    <div class="image-text_89 flex-row justify-between">
                      <img
                        class="thumbnail_87"
                        referrerpolicy="no-referrer"
                        src="./assets/img/SketchPnga9f3f1773d077635abbc36266b25dd5d4ac4c805e28c98fb05d2ca55a9907d90.png"
                      />
                      <div class="text-group_67 flex-col justify-between">
                        <span class="text_269">收入曲线</span>
                        <span class="text_270">活跃值</span>
                      </div>
                    </div>
                    <div class="image-text_90 flex-row justify-between">
                      <img
                        class="thumbnail_88"
                        referrerpolicy="no-referrer"
                        src="./assets/img/SketchPng7a1a99144b0d4024426b5c7092d3e12532fae037be9cf14a7c64b63ef8f76c52.png"
                      />
                      <div class="text-group_68 flex-col justify-between">
                        <span class="text_269">收入曲线</span>
                        <span class="text_270">活跃值</span>
                      </div>
                    </div>
                  </div>
                  <div class="box_106 flex-col justify-between">
                    <img
                      class="image_35"
                      referrerpolicy="no-referrer"
                      src="./assets/img/SketchPng9c6decacb847f483a13dc4cc525a5ebbe92742a404371caeb3a79c0dac4fcfe4.png"
                    />
                    <div class="section_49 flex-col"></div>
                  </div>
                </div>
                <img
                  class="image_36"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPngd2f38cd3204a03a0bd62810f16e1aef95128082d61311aef1807c935fe83aca9.png"
                />
                <div class="image-wrapper_48 flex-col">
                  <img
                    class="image_37"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPnge807d3d1415d0c51925cb18e2034117469f9d052d349018a5dbb93fa1fbdc139.png"
                  />
                </div>
                <img
                  class="image_38"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPngbc45e3890b58ef444e93de2e2d1fed0e35c57db11ca127cc8835fcf403cab27f.png"
                />
              </div>
              <div class="group_25 flex-col">
                <span class="text_98">{{ t('premiumFeatures') }}</span>
                <div class="block_7 flex-col">
                  <span class="text_99">
                    {{ t('premiumDescription') }}
                  </span>
                  <div class="text-wrapper_38 flex-col">
                    <span class="text_100">{{ t('seeMoreFeatures') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box_107 flex-col">
        <div class="group_101 flex-row justify-between">
          <div class="box_108 flex-row justify-between">
            <div class="text-wrapper_149 flex-col"><span class="text_271">全部公链</span></div>
            <div class="list_9 flex-row">
              <div
                class="image-text_91 flex-row justify-between"
                :style="{ background: item.lanhuBg0 }"
                v-for="(item, index) in loopData0"
                :key="index"
                :class="{ selected_chain: selectedChainIndex === index }"
                @click="handleChainClick(index)"
              >
                <img class="thumbnail_89" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
                <span class="text-group_69" v-html="item.lanhutext0"></span>
              </div>
            </div>
          </div>
          <div class="search-container flex-row">
            <input
              type="text"
              v-model="searchQuery"
              @input="handleSearchInput"
              @keyup.enter="performSearch"
              placeholder="搜索社区..."
              class="search-input"
            />
            <button
              @click="performSearch"
              class="search-button flex-row"
            >
              <img
                class="search-icon"
                referrerpolicy="no-referrer"
                src="./assets/img/SketchPng52a3293a8098f555230305c71e842d40db4338857637cc1bc3946587eab3b467.png"
              />
            </button>
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="clear-button"
            >
              ×
            </button>
          </div>
        </div>
        <div class="group_102 flex-row justify-between">
          <div class="text-wrapper_150 flex-col"><span class="text_273">全部社区</span></div>
          <div class="list_10 flex-row">
            <div
              class="image-text_92 flex-row"
              v-for="(item, index) in loopData1"
              :key="index"
              :class="{ selected111: selectedIndex === index }"
              @click="handleClick(index)"
            >
              <img
                v-if="item.slot1 === 1"
                class="thumbnail_90"
                referrerpolicy="no-referrer"
                :src="item.specialSlot1.lanhuimage0"
              />

              <span class="text-group_70" v-html="item.lanhutext0"></span>
            </div>
          </div>
        </div>
        <div class="group_103 flex-row justify-between">
          <div class="text-wrapper_151 flex-col"><span class="text_274">全����区</span></div>
          <div class="list_11 flex-row">
            <div
              class="image-text_93 flex-row"
              :style="{ background: item.lanhuBg0 }"
              v-for="(item, index) in loopData2"
              :key="index"
              :class="{ selected_region: selectedRegionIndex === index }"
              @click="handleRegionClick(index)"
            >
              <img class="thumbnail_92" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
              <span class="text-group_71" v-html="item.lanhutext0"></span>
            </div>
          </div>
        </div>
        <div class="group_104 flex-row">
          <div class="image-text_94 flex-row justify-between ranking-option"
               :class="{ 'ranking-active': currentRankingType === 'hyd' }"
               style="cursor: pointer;"
               @click="sortByRanking('hyd')">
            <img
              class="thumbnail_93"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPng470e2d2430c126d803442377b72d5ac2abcdcac681c68e41f0814a3c75c13f68.png"
            />
            <div class="text-group_72">
              <span class="text_275">按热度排名</span>
              <span class="sorting-arrow">
                <i v-if="currentRankingType === 'hyd' && sortingState.hyd === 'desc'" class="arrow-down">↓</i>
                <i v-if="currentRankingType === 'hyd' && sortingState.hyd === 'asc'" class="arrow-up">↑</i>
                <i v-if="currentRankingType === 'hyd' && sortingState.hyd === 'none'" class="arrow-reset">○</i>
                <i v-if="currentRankingType !== 'hyd'" class="arrow-inactive">○</i>
              </span>
            </div>
          </div>
          <div class="image-text_95 flex-row justify-between ranking-option"
               :class="{ 'ranking-active': currentRankingType === 'vx_qunrs' }"
               style="cursor: pointer;"
               @click="sortByRanking('vx_qunrs')">
            <img
              class="thumbnail_94"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPng7acc48bb08f97d8c44e4c97d1cc0248f0d4c3862b3c7c85ec38295d72333751e.png"
            />
            <div class="text-group_73">
              <span>按人数排名</span>
              <span class="sorting-arrow">
                <i v-if="currentRankingType === 'vx_qunrs' && sortingState.vx_qunrs === 'desc'" class="arrow-down">↓</i>
                <i v-if="currentRankingType === 'vx_qunrs' && sortingState.vx_qunrs === 'asc'" class="arrow-up">↑</i>
                <i v-if="currentRankingType === 'vx_qunrs' && sortingState.vx_qunrs === 'none'" class="arrow-reset">○</i>
                <i v-if="currentRankingType !== 'vx_qunrs'" class="arrow-inactive">○</i>
              </span>
            </div>
          </div>
          <div class="image-text_96 flex-row justify-between ranking-option"
               :class="{ 'ranking-active': currentRankingType === 'jcz' }"
               style="cursor: pointer;"
               @click="sortByRanking('jcz')">
            <img
              class="thumbnail_95"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPng4d52f24c46f194db03dd11f73019d6c75af74ca7b8a9c3e1e5bcc5707beebb36.png"
            />
            <div class="text-group_74">
              <span>按成交额排名</span>
              <span class="sorting-arrow">
                <i v-if="currentRankingType === 'jcz' && sortingState.jcz === 'desc'" class="arrow-down">↓</i>
                <i v-if="currentRankingType === 'jcz' && sortingState.jcz === 'asc'" class="arrow-up">↑</i>
                <i v-if="currentRankingType === 'jcz' && sortingState.jcz === 'none'" class="arrow-reset">○</i>
                <i v-if="currentRankingType !== 'jcz'" class="arrow-inactive">○</i>
              </span>
            </div>
          </div>
          <div class="box_110 flex-row justify-between">
            <span class="text_277">社区平台</span>
            <img
              class="thumbnail_96"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPngbf857797cfa2c6a25b17a51525e810150a1b68ee6e49b1db87bdefad10379cca.png"
            />
          </div>
          <div class="box_111 flex-row justify-between">
            <span class="text_278">社区分类</span>
            <img
              class="thumbnail_97"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPng5c18299e5ab8ca9063015753319ad6e968e6cba3780cebfe70d0c1de22318ab4.png"
            />
          </div>
          <div class="box_112 flex-row justify-between">
            <span class="text_279">全部地区</span>
            <img
              class="thumbnail_98"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPng5c18299e5ab8ca9063015753319ad6e968e6cba3780cebfe70d0c1de22318ab4.png"
            />
          </div>
        </div>

        <!-- 搜索状态提示 -->
        <div v-if="isSearching && searchQuery" class="search-status">
          <span class="search-info">
            搜索 "{{ searchQuery }}" 的结果：找到 {{ sortedCommunityData.length }} 个社区
          </span>
          <button @click="clearSearch" class="clear-search-btn">
            清除搜索
          </button>
        </div>

          <div
              class="scroll-container grid_1 flex-row"
              ref="scrollContainer"
              @scroll="handleScroll"
          >
          <div
              class="section_66 flex-col"
              v-for="(item, index) in sortedCommunityData"
              :key="index"
          >
            <!-- 顶部信息 -->
            <div class="section_67 flex-row">
              <div class="group_123 flex-col">
                <img
                    class="thumbnail_118"
                    referrerpolicy="no-referrer"
                    :src=item.vx_quntx
                />
              </div>

              <div class="group_124 flex-col justify-between">
                <div class="text-wrapper_160 flex-row justify-between">
                  <!-- 群名 -->
                  <span class="text_card_1">{{ item.vx_qunname }}</span>
                  <!-- 群人数 -->
                  <span class="text_316">({{ item.vx_qunrs }}人)</span>
                </div>
                <div class="text-wrapper_161 flex-row justify-between">
                  <span class="text_317">{{ t('activeDaily') }}：{{ item.ltrs }}{{ t('people') }}</span>
                  <span class="text_318">{{ item.msg_count }}{{ t('messages') }}</span>
                </div>
              </div>

              <img
                  class="label_57"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng26d24569117b92d4bd5f00454a80f71112a75f9ce6af7a71bbd065120c52b4ca.png"
              />
            </div>

            <!-- 标签 -->
            <span class="text_319">{{item.bq}}</span>

            <!-- 估值 / 流量值 -->
            <div class="section_68 flex-row">
              <img
                  class="thumbnail_119"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng0c8b48300b9dc67c9161f98e5d4cfd0f81f0800c06efd0e0226244743d48accb.png"
              />
              <div class="image-text_106 flex-row">
                <div class="text-group_84 flex-row justify-between">
                  <span class="text_320">{{ t('valuation') }}:&nbsp;{{ item.jcz }}&nbsp;XING</span>
                  <span class="text_321">+1.24%</span>
                </div>
                <img
                    class="thumbnail_120"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPng962a8d97efe2c084da17c44dcb39175edaa8a11074b19f760d6d6d20202c699f.png"
                />
              </div>
              <span class="text_322">{{ t('trafficValue') }}:{{ item.hyd }}</span>
            </div>

            <!-- 底部功能按钮 -->
            <div class="section_69 flex-row justify-between">
              <div class="image-text_107 flex-row justify-between">
                <img
                    class="label_58"
                    referrerpolicy="no-referrer"
                    src="./assets/img/SketchPngf0b54efe2ace70204380cdbc94b922a3c0757eae4bce35908b7cee7fc28924c2.png"
                />
                <span class="text-group_85">广告和空投投放</span>
              </div>
              <div class="section_70 flex-row">
                <div class="image-text_108 flex-row justify-between">
                  <img
                      class="label_59"
                      referrerpolicy="no-referrer"
                      src="./assets/img/SketchPng249b7186377e75b92373958e7d597bc0b7e5251f43f182a70b8e5b15fc40bf27.png"
                  />
                  <span class="text-group_86">连接</span>
                </div>
              </div>
            </div>
          </div>

            <div v-if="loading" class="loading-tip">加载中...</div>
            <div v-if="noMoreData" class="end-tip">没有更多数据了</div>
          </div>
      </div>
      <div class="box_143 flex-col">
        <div class="text-wrapper_66">
          <span class="text_217">优质</span>
          <span class="text_218">Web3</span>
          <span class="text_219">合作项目</span>
        </div>
        <div class="list_12 flex-row">
          <div class="list-items_1 flex-col" v-for="(item, index) in loopData3" :key="index">
            <div class="group_140 flex-row justify-between">
              <div class="image-text_123 flex-row justify-between">
                <div class="block_35 flex-col" :style="{ background: item.lanhuBg3 }"></div>
                <div class="text-group_101 flex-col justify-between">
                  <span class="text_220" v-html="item.lanhutext0"></span>
                  <span class="text_221" v-html="item.lanhutext1"></span>
                </div>
              </div>
              <div class="image-text_124 flex-col justify-between">
                <img class="image_19" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
                <span class="text-group_42" v-html="item.lanhutext2"></span>
              </div>
            </div>
            <div class="group_58 flex-row justify-between">
              <div class="text-group_101 flex-col justify-between">
                <span class="text_222" v-html="item.lanhutext3"></span>
                <span class="text_223" v-html="item.lanhutext4"></span>
              </div>
              <div class="text-wrapper_67 flex-col"><span class="text_224" v-html="item.lanhutext5"></span></div>
            </div>
          </div>
        </div>

        <div class="group_59 flex-col">
          <div class="box_144 flex-row">
            <div class="image-wrapper_40 flex-col">
              <img
                  class="image_20"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng2a64a395aef78320ece8e71ed3002830cc6c897b3db7066d3730a74d3a8eaf66.png"
              />
            </div>
            <div class="image-wrapper_41 flex-col">
              <img
                  class="image_21"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPngf05d2f57b6728318f090c20089b201bc52f6abfde5678eb1866e62e53e331f74.png"
              />
            </div>
            <div class="image-wrapper_42 flex-col">
              <img
                  class="image_22"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng07724f541ff49fae8a23f32ad0a02d548f482042e081467c9b8a36a5c8f1564e.png"
              />
            </div>
            <div class="image-wrapper_43 flex-col">
              <img
                  class="image_23"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPngdfcd4853b247073d2544c7b9b43f57e9eade1d810465ce5f5cf793064cb9f127.png"
              />
            </div>
            <div class="image-wrapper_44 flex-col">
              <img
                  class="image_24"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPngddc803406b0aa98453fb7ee569aecb10c1dbe903af75d2975d184e38aa5a0f06.png"
              />
            </div>
            <div class="image-wrapper_45 flex-col">
              <img
                  class="image_25"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng25b06e5fa1f367a2fd3c04dd773d64aadaf21ac8a3467b310404f0820495af50.png"
              />
            </div>
          </div>
        </div>
        <div class="group_60 flex-col justify-end">
          <!-- 回到顶部区域 -->
          <div class="back-to-top-section">
            <a-back-top
              :visible-height="300"
              @click="handleBackToTop"
              class="custom-back-top"
            />
            <div class="scroll-indicator">
              <span class="scroll-text">快速回到顶部</span>
              <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
            </div>
          </div>

          <!-- 底部内容区域 -->
          <div class="box_145 flex-row">
            <!-- 公司信息 -->
            <div class="group_141 flex-col footer-section" @click="handleCompanyInfo">
              <div class="text-wrapper_176 flex-row justify-between company-header">
                <span class="text_225">{{ footerData.company.name }}</span>
                <span class="text_226 company-status" :class="{ 'online': footerData.company.isOnline }">
                  {{ footerData.company.isOnline ? '●' : '○' }}
                </span>
              </div>
              <div class="text-wrapper_69 company-details">
                <span class="paragraph_3">
                  {{ footerData.company.address }}
                  <br />
                  <a :href="`mailto:${footerData.company.email}`" @click.stop="handleEmailClick">
                    Email: {{ footerData.company.email }}
                  </a>
                  <br />
                  <a :href="`tel:${footerData.company.phone}`" @click.stop="handlePhoneClick">
                    Phone: {{ footerData.company.phone }}
                  </a>
                  <br />
                </span>
                <span class="text_227 get-direction-btn" @click.stop="handleGetDirection">
                  获取路线 🗺️
                </span>
              </div>
              <div class="image-wrapper_84 flex-row justify-between social-icons">
                <img
                  v-for="(social, index) in footerData.socialMedia"
                  :key="index"
                  :class="`thumbnail_${80 + index} social-icon`"
                  referrerpolicy="no-referrer"
                  :src="social.icon"
                  :alt="social.name"
                  @click.stop="handleSocialClick(social)"
                  :title="social.name"
                />
              </div>
            </div>

            <!-- 帮助链接 -->
            <div class="group_142 flex-col justify-between footer-section">
              <div class="text-wrapper_70 flex-col">
                <span class="text_228">帮助中心</span>
              </div>
              <div class="help-links">
                <a
                  v-for="(link, index) in footerData.helpLinks"
                  :key="index"
                  @click="handleHelpClick(link)"
                  class="help-link"
                >
                  {{ link.name }}
                </a>
              </div>
            </div>

            <!-- 有用链接 -->
            <div class="group_64 flex-row footer-section">
              <div class="text-group_101 flex-col justify-between">
                <span class="text_229">快速导航</span>
                <div class="useful-links">
                  <a
                    v-for="(link, index) in footerData.usefulLinks"
                    :key="index"
                    @click="handleUsefulLinkClick(link)"
                    class="useful-link"
                  >
                    {{ link.name }}
                  </a>
                </div>
              </div>
            </div>

            <!-- 邮件订阅 -->
            <div class="group_143 flex-col footer-section">
              <div class="text-wrapper_71 flex-col">
                <span class="text_230">邮件订阅</span>
              </div>
              <span class="text_231">
                订阅我们的邮件列表，获取最新资讯、独家内容和优惠信息！
              </span>
              <div class="email-subscription">
                <div class="email-input-container">
                  <input
                    type="email"
                    v-model="emailSubscription.email"
                    @keyup.enter="handleEmailSubscribe"
                    placeholder="请输入您的邮箱地址"
                    class="email-input"
                    :class="{ 'error': emailSubscription.error }"
                  />
                  <button
                    @click="handleEmailSubscribe"
                    class="subscribe-btn"
                    :disabled="emailSubscription.loading"
                  >
                    {{ emailSubscription.loading ? '订阅中...' : '订阅' }}
                  </button>
                </div>
                <div v-if="emailSubscription.message" class="subscription-message" :class="emailSubscription.messageType">
                  {{ emailSubscription.message }}
                </div>
              </div>
              <img
                class="image_26 newsletter-image"
                referrerpolicy="no-referrer"
                src="./assets/img/SketchPng8ebd50fec10de3f0d8dfc10e1dc37e660b95722b162ba6d99e94c4fb93ea9475.png"
              />
            </div>
          </div>

          <!-- 版权信息 -->
          <div class="text-wrapper_177 flex-row copyright-section">
            <span class="paragraph_6">
              Copyright © {{ currentYear }} {{ footerData.company.name }}. All Rights Reserved
              <br />
              <span class="additional-info">
                网站运行时间: {{ websiteUptime }} | 访问量: {{ formatNumber(footerData.stats.visitors) }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationMenu from '@/components/NavigationMenu.vue';
import { getTranslation, getCurrentLanguage } from '@/utils/translations.js';

export default {
  components: {
    NavigationMenu
  },
  data() {
    return {

      currentLanguage: getCurrentLanguage(),
      communityActivityTab: 'active',
      communityVolumeTab: 'total',
      currentRankingType: 'hyd', // 默认按热度排名
      sortingState: {
        'hyd': 'none', // none: 无排序, asc: 升序(从低到高), desc: 降序(从高到低)
        'vx_qunrs': 'none',
        'jcz': 'none'
      },

      // Community Activity Data
      communityActivityData: {
        active: { num1: 0, num2: 0 },
        traffic: { num1: 0, num2: 0 }
      },
      selectedIndex: 0,
      selectedChainIndex: 0, // 全部公链选中索引
      selectedRegionIndex: 0, // 全部地区选中索引
      selectedSocialIndex: 0, // 社群按钮选中索引
      sortedCommunityData: [],  // 当前渲染的数据
      loading: false,
      noMoreData: false,
      batchSize: 20,         // 每次“加载更多���渲染的条数
      renderIndex: 0,        // 当前已经渲染到第几个数据了（索引）
      // Community Volume Data
      communityVolumeData: {
        total: { num1: 0, num2: 0, num3: 0 },
        yesterday: { num1: 0, num2: 0, num3: 0 }
      },

      // Animated numbers
      animatedCommunityActivityNumber1: 0,
      animatedCommunityActivityNumber2: 0,
      animatedCommunityVolumeNumber1: 0,
      animatedCommunityVolumeNumber2: 0,
      animatedCommunityVolumeNumber3: 0,

      loopData0: [
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng0420867cd86e335e06e327ecdf1608acfb6b0b31b158acac16f95719e44e8a89',
          lanhutext0: 'BSC'
        },
        {
          lanhuBg0: '',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngce66f2e70b69d6bc4b2e64683a0ee427ffc0a2c075cfcf3f109810c1d3579f74',
          lanhutext0: 'SOL'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng511678aacb4aa2ef2ceb764ee633cc6b9974eefa62d7d3c31c9172c1f5814801',
          lanhutext0: 'ETH'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng0fcea56b94593aa90fd4ae53c964172d29f072a4915a9c41923dbd6bc666ab93',
          lanhutext0: 'BASE'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb1ad3b45ed9450022315a6ee5c64e105d4370fcb83976efc565d26a58cb96aae',
          lanhutext0: 'TRON'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng0ab1adf8a10cc78012e50f9dde63bda44d480360bc5f1e76774211316c255c5e',
          lanhutext0: 'OP'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng184210a3733da2f07a44c079f81b3e1087f3213e7212d2c58a41d47ebf87f3b6',
          lanhutext0: 'BTC'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngf04ecf623c36e713ab68886df3337d5f2aa528dc9d60a9c4a96720b3fec1592b',
          lanhutext0: 'AVA'
        }
      ],
      loopData1: [
        {
          lanhuBg0: 'transparent',
          lanhutext0: 'WEB3',
          specialSlot1: {
            lanhuimage0:
              'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng0420867cd86e335e06e327ecdf1608acfb6b0b31b158acac16f95719e44e8a89'
          },
          slot1: 1
        },
        {
          lanhuBg0: '',
          lanhutext0: 'MEME',
          specialSlot1: {
            lanhuimage0:
              'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng8bf753ba535b752cbd92254cc4b195c7269f5a92dfa3fc5459095ccec05d628b'
          },
          slot1: 1
        },
        {
          lanhuBg0: 'transparent',
          lanhutext0: 'RWA',
          specialSlot1: {
            lanhuimage0:
              'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng31f1d50bb4864420b4a2c4682b82ea4920678be3914190424dadff78615af5fc'
          },
          slot1: 1
        },
        {
          lanhuBg0: 'transparent',
          lanhutext0: 'NFT',
          specialSlot1: {
            lanhuimage0:
              'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng400d492fc46b336bf6c4db95cad19343a0f7c241b9b812aded3b1da30916a6c7'
          },
          slot1: 1
        },
        {
          lanhuBg0: 'transparent',
          lanhutext0: 'Project',
          specialSlot1: {
            lanhuimage0:
              'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng71cf4c37a3db6e134bd5cc84e55a4b13c4ce1b244961c4a08ce6af4d3dafb7e3'
          },
          slot1: 1
        },
        {
          lanhuBg0: 'transparent',
          lanhutext0: '合约',
          specialSlot1: {
            lanhuimage0:
              'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb57ce3b74079f562288701bd4087cb964e7ef5663756f08e39b2e62e35cf6be5'
          },
          slot1: 1
        },
        {
          lanhuBg0: 'transparent',
          lanhutext0: '吃瓜',
          specialSlot1: {
            lanhuimage0:
              'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng1451ed848d1d9638318416d0d348af5cadc028b3385996903d1c6dc75a3f28ae'
          },
          slot1: 1
        },
        {
          lanhuBg0: 'transparent',
          lanhutext0: 'GameFi',
          specialSlot1: {
            lanhuimage0:
              'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng7920131d1a0b90f8880965817540f65afd35f81b1b22d3c29f5bbbe72e566774'
          },
          slot1: 1
        },
        { lanhuBg0: 'transparent', lanhutext0: '会议/活动', slot2: 2 }
      ],
      loopData2: [
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng0420867cd86e335e06e327ecdf1608acfb6b0b31b158acac16f95719e44e8a89',
          lanhutext0: '亚洲'
        },
        {
          lanhuBg0: '',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3683dcb2ce1f40d893ee8d3540c9e39461e9805a30d0f5a4b05c08281fc2a314',
          lanhutext0: '香港'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPnge722ae877a3973f70f4f03a2589c2403adfb76675368de17866346e81d4080b2',
          lanhutext0: '日本'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngd343f1eef047fb0ba80a85eb293d7868edbb450d3985a840970f48ab4802730e',
          lanhutext0: '泰国'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb18ae525689dc8f5c2553cd53b3f10a878447302acd1054230cb545b6ae89b89',
          lanhutext0: '北美'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngc021de09598e5ba65b998929c426e4e3df7812dd427b1301dfffabec466e9b19',
          lanhutext0: '南非'
        },
        {
          lanhuBg0: 'transparent',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngf7cfe4a55a04e4c4ef0666b270674e8348d1fab9229521a202bcd4f56ca9107d',
          lanhutext0: '东欧'
        }
      ],
      loopData3: [
        {
          lanhuBg3:
            'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/ace8fe0966794301b91ef00a7df142a3_mergeImage.png)',
          lanhutext0: 'Elympics',
          lanhutext1: '&#64;elympics_ai',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb163ce479dccd085f845225e47a6903941b30dae5c9f8194131c1d1cf9910742',
          lanhutext2: '3.33K&nbsp;unique&nbsp;SNAPPERS',
          lanhutext3: 'Total&nbsp;Reward&nbsp;pool',
          lanhutext4: '$560K&nbsp;in&nbsp;$ELP',
          lanhutext5: 'View'
        },
        {
          lanhuBg3:
            'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/547b72e09b96434bb90f36e787ee7de3_mergeImage.png)',
          lanhutext0: 'Recall',
          lanhutext1: '&#64;elympics_ai',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb163ce479dccd085f845225e47a6903941b30dae5c9f8194131c1d1cf9910742',
          lanhutext2: '8.87K&nbsp;unique&nbsp;SNAPPERS',
          lanhutext3: 'Total&nbsp;Reward&nbsp;pool',
          lanhutext4: '0.5%&nbsp;of&nbsp;&nbsp;TOtal&nbsp;Token&nbsp;Supply',
          lanhutext5: 'View'
        },
        {
          lanhuBg3:
            'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/851e461393d64891aee8f6c2fe140ff1_mergeImage.png)',
          lanhutext0: 'Elympics',
          lanhutext1: '&#64;elympics_ai',
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb163ce479dccd085f845225e47a6903941b30dae5c9f8194131c1d1cf9910742',
          lanhutext2: '3.33K&nbsp;unique&nbsp;SNAPPERS',
          lanhutext3: 'Total&nbsp;Reward&nbsp;pool',
          lanhutext4: '$560K&nbsp;in&nbsp;$ELP',
          lanhutext5: 'View'
        }
      ],
      sectionImages: [],
      searchQuery: '',
      originalCommunityData: [], // 保存原始数据用于搜索
      isSearching: false,
      searchTimeout: null,
      scrollProgress: 0,
      currentYear: new Date().getFullYear(),
      websiteUptime: '',
      emailSubscription: {
        email: '',
        loading: false,
        error: false,
        message: '',
        messageType: 'success'
      },
      footerData: {
        company: {
          name: 'XTrade',
          address: '中国香港特别行政区中环金融街1号',
          email: 'contact@xtrade.com',
          phone: '+852-1234-5678',
          isOnline: true
        },
        socialMedia: [
          {
            name: 'WeChat',
            icon: './assets/img/SketchPng837658bc409af72b6e102936e76c4143d0194261f17df8e088646b0c8b6e0b32.png',
            url: '#'
          },
          {
            name: 'Telegram',
            icon: './assets/img/SketchPng325373f2cb2e0668e3e03a5535b23cc36aa345164494c6ae98e76ce4654ec691.png',
            url: '#'
          },
          {
            name: 'Twitter',
            icon: './assets/img/SketchPng98bdc523a7e483e558c2703cabfe03af005b5b5ea8eabda430b0aa79b87f5da7.png',
            url: '#'
          },
          {
            name: 'Discord',
            icon: './assets/img/SketchPnge2badec4e155d55a245c5776387a8f88332e6c12623976686ac8553aee442f70.png',
            url: '#'
          }
        ],
        helpLinks: [
          { name: '隐私政策', url: '/privacy' },
          { name: '退款政策', url: '/refund' },
          { name: '配送信息', url: '/shipping' },
          { name: '条款条件', url: '/terms' },
          { name: '常见问题', url: '/faq' },
          { name: '产品比较', url: '/compare' },
          { name: '我的愿望清单', url: '/wishlist' }
        ],
        usefulLinks: [
          { name: '我们的商店', url: '/store' },
          { name: '参观商店', url: '/visit' },
          { name: '联系我们', url: '/contact' },
          { name: '关于我们', url: '/about' },
          { name: '我的账户', url: '/account' }
        ],
        stats: {
          visitors: 1234567,
          uptime: new Date('2023-01-01')
        }
      },
      constants: {},
      data: {
        zfgrq: 123456,
        yjrsq: 789012,
        data: [
          {
            vx_qunname: "加密货币投资交流群",
            vx_qunrs: 2456,
            hyd: 824,
            msg_count: 1520,
            jcz: 15800,
            msg_factor: 2.45
          },
          {
            vx_qunname: "DeFi协���研讨社区",
            vx_qunrs: 1892,
            hyd: 623,
            msg_count: 890,
            jcz: 12500,
            msg_factor: 1.98
          },
          {
            vx_qunname: "NFT艺术收藏家",
            vx_qunrs: 3201,
            hyd: 1056,
            msg_count: 2340,
            jcz: 28900,
            msg_factor: 3.12
          },
          {
            vx_qunname: "Web3开发者联盟",
            vx_qunrs: 1456,
            hyd: 487,
            msg_count: 756,
            jcz: 9800,
            msg_factor: 1.67
          },
          {
            vx_qunname: "区块链新手学习群",
            vx_qunrs: 5642,
            hyd: 1789,
            msg_count: 4230,
            jcz: 45600,
            msg_factor: 4.25
          },
          {
            vx_qunname: "MEME币讨论社区",
            vx_qunrs: 2890,
            hyd: 934,
            msg_count: 1876,
            jcz: 18700,
            msg_factor: 2.89
          }
        ]
      }
    };
  },
  computed: {
    t() {
      return (key) => getTranslation(key, this.currentLanguage);
    },

  },
  methods: {
    handleClick(index) {
      this.selectedIndex = index;
      this.onSelected(index);
    },
    onSelected(index) {
      console.log('选中了索引:', index);
    },

    // 全部公链点击处理
    handleChainClick(index) {
      this.selectedChainIndex = index;
      this.onChainSelected(index);
    },
    onChainSelected(index) {
      console.log('选中了��链索引:', index);
      console.log('选中的公链:', this.loopData0[index]);
    },

    // 全部地区点击处理
    handleRegionClick(index) {
      this.selectedRegionIndex = index;
      this.onRegionSelected(index);
    },
    onRegionSelected(index) {
      console.log('选中了地区索引:', index);
      console.log('选中的地区:', this.loopData2[index]);
    },

    // 社群按钮点击处理
    handleSocialClick(index, type) {
      this.selectedSocialIndex = index;
      this.onSocialSelected(index, type);
    },
    onSocialSelected(index, type) {
      console.log('选中了社群按钮索引:', index);
      console.log('选中的社群类型:', type);
      // 这里可以添加具体的社群跳转逻辑
      switch(type) {
        case '微信社群':
          // 微信社群逻辑
          break;
        case 'TG社群':
          // TG社群逻辑
          break;
        case 'QQ社群':
          // QQ社群逻辑
          break;
        case 'Twitter':
          // Twitter逻辑
          break;
        case '领养':
          // 领���逻辑
          break;
        case '社区入驻':
          // 社区入驻逻辑
          break;
        case '广告投放':
          // 广告投放逻辑
          break;
      }
    },

    handleNavigation(item) {
      console.log('导航到:', item);
      // 这���可以添加路由跳转逻辑
      if (item.href) {
        if (item.href.startsWith('http')) {
          window.open(item.href, '_blank');
        } else {
          this.$router.push(item.href);
        }
      }
    },

    handleLanguageChange(language) {
      console.log('语言切换到:', language);
      this.currentLanguage = language.code;

      // 更新页面内容
      this.updatePageLanguage(language);

      // 强制更新组件
      this.$forceUpdate();
    },

    handleSearchQuery(query) {
      console.log('搜索查询:', query);
      // 这里可以添加搜索功能
      // 例如：过滤数据或发送搜索请求
    },

    updatePageLanguage(language) {
      // 根��语言代码更新页面内容
      // 这只是一个示例，实际项���中应该使用i18n库
      document.documentElement.lang = language.code;
    },

    switchCommunityActivityTab(tab) {
      if (this.communityActivityTab === tab) return;

      this.communityActivityTab = tab;
      const targetData = this.communityActivityData[tab];

      this.animateNumber('animatedCommunityActivityNumber1', targetData.num1);
      this.animateNumber('animatedCommunityActivityNumber2', targetData.num2);
    },

    switchCommunityVolumeTab(tab) {
      if (this.communityVolumeTab === tab) return;

      this.communityVolumeTab = tab;
      const targetData = this.communityVolumeData[tab];

      this.animateNumber('animatedCommunityVolumeNumber1', targetData.num1);
      this.animateNumber('animatedCommunityVolumeNumber2', targetData.num2);
      this.animateNumber('animatedCommunityVolumeNumber3', targetData.num3);
    },

    // 排序方法
    sortByRanking(rankingType) {
      // 如果是同一个排序类型，切换排序状态
      if (this.currentRankingType === rankingType) {
        const currentState = this.sortingState[rankingType];
        if (currentState === 'none') {
          this.sortingState[rankingType] = 'desc'; // 从高到低
        } else if (currentState === 'desc') {
          this.sortingState[rankingType] = 'asc'; // 从低到高
        } else if (currentState === 'asc') {
          this.sortingState[rankingType] = 'none'; // 重置
        }
      } else {
        // 如果是不同的排序类型，重置所有���态并激活新的
        Object.keys(this.sortingState).forEach(key => {
          this.sortingState[key] = 'none';
        });
        this.currentRankingType = rankingType;
        this.sortingState[rankingType] = 'desc'; // 默认从高到低开始
      }

      this.applySorting();
      console.log(`${this.getRankingTypeName(rankingType)}排名：${this.getSortingStateName(this.sortingState[rankingType])}`);
    },

    // 获取排序状态的中文名称
    getSortingStateName(state) {
      const stateNames = {
        'desc': '从高到低',
        'asc': '从低到高',
        'none': '重置'
      };
      return stateNames[state] || '未知';
    },

    // 应用排序
    applySorting() {
      const activeType = this.currentRankingType;
      const sortState = this.sortingState[activeType];

      if (sortState === 'none') {
        // 重置排序，恢复原始��序
        this.sortedCommunityData = [];
        this.renderIndex = 0;
        this.noMoreData = false;
        this.loadMoreFromAllData();
        return;
      }

      // 对当前显示的数据进行排���
      if (this.sortedCommunityData.length > 0) {
        this.sortedCommunityData.sort((a, b) => {
          let valueA = Number(a[activeType]) || 0;
          let valueB = Number(b[activeType]) || 0;

          if (sortState === 'desc') {
            return valueB - valueA; // 从高到低
          } else if (sortState === 'asc') {
            return valueA - valueB; // 从低到高
          }
          return 0;
        });
      }
    },

    // 获取排序类型的中文名称
    getRankingTypeName(type) {
      const typeNames = {
        'hyd': '热度',
        'vx_qunrs': '人数',
        'jcz': '成交额'
      };
      return typeNames[type] || type;
    },

    animateNumber(property, targetValue) {
      const startValue = this[property];
      const startTime = Date.now();
      const duration = 500; // 0.5秒动画

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // 使用缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.round(startValue + (targetValue - startValue) * easeProgress);
        this[property] = currentValue;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    },

    // 模拟API请求获取图片链接
    async fetchSectionImages() {
      try {
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 模拟返回的图片数据
        const mockImageData = [
          {
            id: 1,
            url: 'https://picsum.photos/300/200?random=1',
            alt: '区块链技术图片',
            title: '区块链技术'
          },
          {
            id: 2,
            url: 'https://picsum.photos/300/200?random=2',
            alt: 'DeFi生态图片',
            title: 'DeFi生态'
          },
          {
            id: 3,
            url: 'https://picsum.photos/300/200?random=3',
            alt: 'NFT艺术图片',
            title: 'NFT艺术'
          },
          {
            id: 4,
            url: 'https://picsum.photos/300/200?random=4',
            alt: 'Web3开发图片',
            title: 'Web3开发'
          },
          {
            id: 5,
            url: 'https://picsum.photos/300/200?random=5',
            alt: '加密货币图片',
            title: '加密货币'
          }
        ];

        this.sectionImages = mockImageData;
        console.log('图片数据加载成功:', mockImageData);
      } catch (error) {
        console.error('获取图片失败:', error);
        // 设置默认图片
        this.sectionImages = Array(5).fill(null).map((_, index) => ({
          id: index + 1,
          url: `./assets/img/default-${index + 1}.png`,
          alt: `默认图片 ${index + 1}`,
          title: `默认标题 ${index + 1}`
        }));
      }
    },

    // 图片加载成功回调
    onImageLoad(index) {
      console.log(`图片 ${index + 1} 加载成功`);
    },

    // 图片加载错误回调
    onImageError(index) {
      console.log(`图片 ${index + 1} 加载失败`);
      // 设置默认图片
      this.$set(this.sectionImages, index, {
        ...this.sectionImages[index],
        url: './assets/img/SketchPng77f918ef99084cc785ba961bddeb830d58c38d838ae22dbe4110bb41111a6a65.png'
      });
    },

    // 搜索输入处理（实时搜索）
    handleSearchInput() {
      // 防抖处理，延迟300ms执行搜索
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.performSearch();
      }, 300);
    },

    // 执行搜索
    performSearch() {
      const query = this.searchQuery.trim().toLowerCase();

      if (!query) {
        this.clearSearch();
        return;
      }

      this.isSearching = true;
      console.log('执行搜索:', query);

      // 从原始数据中搜索
      const filteredData = this.originalCommunityData.filter(item => {
        return (
          // 搜索群名
          item.vx_qunname.toLowerCase().includes(query) ||
          // 搜索标签
          (item.bq && item.bq.toLowerCase().includes(query)) ||
          // 搜索热度相关
          item.hyd.toString().includes(query) ||
          // 搜索人数相关
          item.vx_qunrs.toString().includes(query)
        );
      });

      // 更新显示的数据
      this.sortedCommunityData = filteredData;
      this.noMoreData = true; // 搜索结果不需要分页加载

      console.log(`搜索结果: 找到 ${filteredData.length} 个社区`);
    },

    // 清空搜索
    clearSearch() {
      this.searchQuery = '';
      this.isSearching = false;
      clearTimeout(this.searchTimeout);

      // 重置为原始数据的分页显示
      this.sortedCommunityData = [];
      this.renderIndex = 0;
      this.noMoreData = false;
      this.loadMoreFromAllData();

      console.log('清空搜索，恢复原始数据');
    },

    // 底部区域功能方法
    handleBackToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.$message.success('已回到顶部');
    },

    handleCompanyInfo() {
      this.$message.info('点击查看公司详细信息');
      // 可以跳转到公司信息页面
    },

    handleEmailClick() {
      this.$message.success('正在打开邮件客户端...');
    },

    handlePhoneClick() {
      this.$message.success('正在拨打电话...');
    },

    handleGetDirection() {
      const address = encodeURIComponent(this.footerData.company.address);
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
      window.open(googleMapsUrl, '_blank');
      this.$message.success('正在打开地图...');
    },

    handleSocialClick(social) {
      this.$message.info(`正在打开 ${social.name}...`);
      if (social.url && social.url !== '#') {
        window.open(social.url, '_blank');
      }
    },

    handleHelpClick(link) {
      this.$message.info(`正在前往 ${link.name}...`);
      // 这里可以添加实际的路由跳转
      if (link.url) {
        this.$router.push(link.url).catch(() => {
          this.$message.warning('页面正在建设中...');
        });
      }
    },

    handleUsefulLinkClick(link) {
      this.$message.info(`正在前往 ${link.name}...`);
      // 这里可以添加实际的路由跳转
      if (link.url) {
        this.$router.push(link.url).catch(() => {
          this.$message.warning('页面正在建设中...');
        });
      }
    },

    async handleEmailSubscribe() {
      if (!this.emailSubscription.email) {
        this.emailSubscription.error = true;
        this.emailSubscription.message = '请输入邮箱地址';
        this.emailSubscription.messageType = 'error';
        return;
      }

      if (!this.validateEmail(this.emailSubscription.email)) {
        this.emailSubscription.error = true;
        this.emailSubscription.message = '请输入有效的邮箱地址';
        this.emailSubscription.messageType = 'error';
        return;
      }

      this.emailSubscription.loading = true;
      this.emailSubscription.error = false;
      this.emailSubscription.message = '';

      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1500));

        this.emailSubscription.message = '订阅成功！感谢您的订阅';
        this.emailSubscription.messageType = 'success';
        this.emailSubscription.email = '';

        this.$message.success('订阅成功！');
      } catch (error) {
        this.emailSubscription.message = '订阅失败，请稍后重试';
        this.emailSubscription.messageType = 'error';

        this.$message.error('订阅失败');
      } finally {
        this.emailSubscription.loading = false;

        // 3秒后清除消息
        setTimeout(() => {
          this.emailSubscription.message = '';
        }, 3000);
      }
    },

    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    updateScrollProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = (scrollTop / docHeight) * 100;
    },

    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    },

    calculateUptime() {
      const now = new Date();
      const uptimeStart = this.footerData.stats.uptime;
      const diffTime = Math.abs(now - uptimeStart);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 365) {
        const years = Math.floor(diffDays / 365);
        const remainingDays = diffDays % 365;
        this.websiteUptime = `${years}年${remainingDays}天`;
      } else {
        this.websiteUptime = `${diffDays}天`;
      }
    },

    handleScroll() {
      if (this.loading || this.noMoreData) return;

      const container = this.$refs.scrollContainer;
      if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 50
      ) {
        this.loadMoreFromAllData();
      }
    },


    loadMoreFromAllData() {
      if (this.loading || this.noMoreData) return;

      this.loading = true;

      setTimeout(() => {
        const nextIndex = this.renderIndex + this.batchSize;

        const nextBatch = this.data.data.slice(this.renderIndex, nextIndex);
        this.sortedCommunityData = [...this.sortedCommunityData, ...nextBatch];
        this.renderIndex = nextIndex;

        if (this.renderIndex >= this.data.data.length) {
          this.noMoreData = true;
        }

        this.loading = false;
      }, 100);
    },

    async getData() {
      try {
        const res = await fetch("/api/v1/sqzcs", {
          headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
            "proxy-connection": "keep-alive",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          },
          method: "GET"
        });

        const json = await res.json();
        this.data = json;
        // 保存原始数据用于搜索
        this.originalCommunityData = [...json.data];
        // this.animatedCommunityActivityNumber1 =  json.zhy,

        this.$set(this.communityActivityData.active, "num1", json.zhy);
        this.$set(this.communityActivityData.active, "num2", json.zhy);
        console.log(json.data);
        const ddd = json.data
            .map(item => Number(item.vx_qunrs))
            .filter(n => !isNaN(n))
          .reduce((a, b) => a + b, 0);
        // this.animatedCommunityActivityNumber2 =  ddd
        this.animateNumber('animatedCommunityActivityNumber1', json.zhy);
        this.animateNumber('animatedCommunityActivityNumber2', ddd);
            this.$set(this.communityActivityData.traffic, "num1", ddd)
        this.$set(this.communityActivityData.traffic, "num2", ddd)
        this.loadMoreFromAllData()
      } catch (err) {
        console.error('API请求失败，使用��拟数据：', err);
        // 保持现有的模拟数据
      }
    },



  },

  mounted() {
    this.getData();
    this.fetchSectionImages();
    //
    // this.timer = setInterval(() => {
    //   this.getData();
    // }, 5000);
    // Load saved language
    const saved = localStorage.getItem('selectedLanguage');
    if (saved) {
      try {
        const language = JSON.parse(saved);
        this.currentLanguage = language.code;
      } catch (e) {
        console.error('Failed to parse saved language:', e);
      }
    }
  },

  beforeDestroy() {
    // 清除搜索防抖定时器
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
};
</script>
<style scoped lang="css" src="./assets/index.response.css" />
