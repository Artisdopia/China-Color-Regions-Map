(() => {
  const labels = {
    en: {topnote:'A field guide to recorded folk song',eyebrow:'CHINA · 15 CULTURAL REGIONS · COLLECTION EXPLORER',headline:'Many voices.<br><em>Many places.</em>',intro:'Explore <a href="https://huggingface.co/datasets/ProjectAquarius/colour-regions" target="_blank" rel="noreferrer">the collection</a> by its 15 cultural regions. Select one to see the provinces and recordings associated with it.',mapLabel:'CULTURAL REGION · RECORDINGS',markerLegend:'Marker size = recordings',few:'Fewer',many:'More',selectProvince:'SELECT A CULTURAL REGION',choose:'Choose a cultural region…',start:'15 cultural regions, many voices',startText:'Move over a cultural-region marker or select one to see its provinces and recordings.',hint:'Select a cultural region to zoom in',fieldnotes:'FIELD<br>NOTES',howTo:'How to read this map',method:'The overview groups recordings by the collection’s 15 cultural regions. Each circle represents recordings assigned to that cultural region; selecting it reveals contributing provinces. A cultural region can span several provinces, and a province can contain recordings from multiple cultural regions. Circle size represents recording counts.',boundarySource:'Boundary geometry: Tianditu national-standard vector data, distributed as GeoJSON by',sourceEnd:'Geometry is simplified for web display. Metadata source:',region:'CULTURAL REGION',genre:'GENRE',ethnicity:'ETHNICITY',performance:'PERFORMANCE',place:'PLACE',recordings:'RECORDINGS FROM THIS PROVINCE',machine:'English tag values and song titles are provided with machine translations; hover over a tag or title to see the original.',chooseOne:'Choose a province…',recordingCount:'recordings',tagCount:'DATASET TAGS IN THIS PROVINCE',back:'All regions',regionTotal:'provinces represented',regionCount:'recordings across this region',tagExplorer:'TAG EXPLORER',tagMatches:'matching recordings',backToProvince:'Back to',tagSourceHint:'Only matching recordings from this selected province are shown. Cultural-region labels describe those local recordings.'},
    zh: {topnote:'中国民歌采录地图',eyebrow:'中国 · 15个文化区域 · 曲目探索',headline:'众声。<br><em>万方。</em>',intro:'按<a href="https://huggingface.co/datasets/ProjectAquarius/colour-regions" target="_blank" rel="noreferrer">数据集</a>划分的15个文化区域探索采录曲目。选择一个区域，查看与之相关的省级地区和曲目。',mapLabel:'文化区域 · 曲目数量',markerLegend:'圆点大小 = 曲目数量',few:'较少',many:'较多',selectProvince:'选择文化区域',choose:'请选择文化区域…',start:'15个文化区域，众声万方',startText:'将鼠标移至文化区域标记或选择一个区域，查看相关省级地区与曲目。',hint:'选择文化区域以放大查看',fieldnotes:'地图<br>说明',howTo:'如何阅读这张地图',method:'总览按数据集的15个文化区域汇总曲目。每个圆点代表归入该文化区域的曲目；选择圆点可查看相关省级地区。一个文化区域可能跨越多个省级地区，同一省级地区也可能包含多个文化区域的曲目。圆点大小代表曲目数量。',boundarySource:'边界数据来自天地图国家标准矢量数据，由',sourceEnd:'提供 GeoJSON；地图显示使用了简化几何。元数据来源：',region:'文化区域',genre:'曲种',ethnicity:'民族',performance:'演出形式',place:'地点',recordings:'本地区曲目',machine:'英文页面中的中文标签与曲名为机器翻译；悬停可查看原文。',chooseOne:'请选择省级地区…',recordingCount:'首曲目',tagCount:'本省级地区曲目标记',back:'返回全部区域',regionTotal:'个相关省级地区',regionCount:'首曲目',tagExplorer:'标签探索',tagMatches:'首匹配曲目',backToProvince:'返回',tagSourceHint:'仅显示所选省级地区内包含此标签的曲目。文化区域标签用于说明这些本地曲目的分类。'},
  };
  const culturalRegions = [
    {key:'jiangsu-zhejiang',en:'Jiangsu–Zhejiang Plain',zh:'江浙平原',color:'#7F8EAF'},
    {key:'tibetan',en:'Tibetan',zh:'藏族民歌区',color:'#8799BA'},
    {key:'southwest-plateau',en:'Southwest Plateau',zh:'西南高原',color:'#8FA4CB'},
    {key:'southwest-multiethnic',en:'Southwest Multi-ethnic',zh:'西南多民族古老原始文化民歌区',color:'#95ADD5'},
    {key:'northern-steppe',en:'Northern Steppe',zh:'北方草原文化民歌区',color:'#A2B7DC'},
    {key:'northwest-plateau',en:'Northwest Plateau',zh:'西北部高原',color:'#B0C5E5'},
    {key:'northeast-plain',en:'Northeast Plain',zh:'东北部平原',color:'#7486AE'},
    {key:'min-tai',en:'Min–Tai',zh:'闽台',color:'#8294B9'},
    {key:'hakka',en:'Hakka',zh:'客家特区',color:'#91A2C4'},
    {key:'jiang-huai',en:'Jiang–Huai',zh:'江淮',color:'#A0AFCC'},
    {key:'yue',en:'Yue',zh:'粤',color:'#7A91BE'},
    {key:'xinjiang',en:'Xinjiang',zh:'新疆民歌区',color:'#8BA1C9'},
    {key:'gan',en:'Gan',zh:'赣',color:'#9BAED2'},
    {key:'jiang-han',en:'Jiang–Han',zh:'江汉',color:'#ADBEDC'},
    {key:'xiang',en:'Xiang',zh:'湘',color:'#BBC9E0'},
  ].map(region => ({...region, count:0, provinces:[], provinceCounts:new Map(), center:[500,380]}));
  const provinceNames = {
    '北京市':'Beijing','天津市':'Tianjin','河北省':'Hebei','山西省':'Shanxi','内蒙古自治区':'Inner Mongolia','辽宁省':'Liaoning','吉林省':'Jilin','黑龙江省':'Heilongjiang','上海市':'Shanghai','江苏省':'Jiangsu','浙江省':'Zhejiang','安徽省':'Anhui','福建省':'Fujian','江西省':'Jiangxi','山东省':'Shandong','河南省':'Henan','湖北省':'Hubei','湖南省':'Hunan','广东省':'Guangdong','广西壮族自治区':'Guangxi','海南省':'Hainan','重庆市':'Chongqing','四川省':'Sichuan','贵州省':'Guizhou','云南省':'Yunnan','西藏自治区':'Tibet','陕西省':'Shaanxi','甘肃省':'Gansu','青海省':'Qinghai','宁夏回族自治区':'Ningxia','新疆维吾尔自治区':'Xinjiang','台湾省':'Taiwan','香港特别行政区':'Hong Kong','澳门特别行政区':'Macau'
  };
  const ethnicEnglish = {'汉':'Han','汉族':'Han','蒙古':'Mongolian','蒙古族':'Mongolian','藏':'Tibetan','藏族':'Tibetan','维吾尔':'Uyghur','维吾尔族':'Uyghur','苗':'Miao','苗族':'Miao','彝':'Yi','彝族':'Yi','壮':'Zhuang','壮族':'Zhuang','侗':'Dong','侗族':'Dong','瑶':'Yao','瑶族':'Yao','土家':'Tujia','土家族':'Tujia','回':'Hui','回族':'Hui','哈萨克':'Kazakh','哈萨克族':'Kazakh','傣':'Dai','傣族':'Dai','白':'Bai','白族':'Bai','纳西':'Naxi','纳西族':'Naxi','布朗':'Bulang','布朗族':'Bulang','傈僳':'Lisu','傈僳族':'Lisu','摩梭人':'Mosuo','朝鲜族':'Korean','土':'Tu','土族':'Tu','羌':'Qiang','羌族':'Qiang','锡伯':'Xibe','锡伯族':'Xibe','满':'Manchu','满族':'Manchu','哈尼':'Hani','哈尼族':'Hani','裕固':'Yugur','裕固族':'Yugur','达斡尔':'Daur','达斡尔族':'Daur','塔塔尔':'Tatar','塔塔尔族':'Tatar','柯尔克孜':'Kyrgyz','柯尔克孜族':'Kyrgyz','佤':'Wa','佤族':'Wa','京':'Jing','京族':'Jing','撒拉':'Salar','撒拉族':'Salar','东乡':'Dongxiang','东乡族':'Dongxiang','鄂温克':'Evenki','鄂温克族':'Evenki','畲':'She','畲族':'She','黎':'Li','黎族':'Li','仡佬':'Gelao','仡佬族':'Gelao','门巴':'Monpa','门巴族':'Monpa','拉祜':'Lahu','拉祜族':'Lahu','保安':'Bonan','保安族':'Bonan','怒':'Nu','怒族':'Nu','布依':'Bouyei','布依族':'Bouyei','水':'Sui','水族':'Sui','赫哲':'Hezhen','赫哲族':'Hezhen','仫佬':'Mulao','仫佬族':'Mulao','鄂伦春':'Oroqen','鄂伦春族':'Oroqen','基诺':'Jino','基诺族':'Jino','白马藏':'Baima Tibetan'};
  const performanceEnglish = {'原生态':'Traditional / unarranged','民族唱法':'Ethnic-style singing','field':'Field recording','other':'Other','instrumental':'Instrumental'};
  ethnicEnglish['普米'] = 'Pumi';
  const el = selector => document.querySelector(selector);
  const details = el('#details'), datasetNote = el('#datasetNote'), select = el('#provinceSelect'), mapRoot = el('#map'), langButton = el('#languageToggle');
  let language = 'en', byProvince = new Map(), selected = '', lastHovered = '', activeRegion = '', viewMode = 'regions', allData, tagTranslations = {}, mapSvg = null, tagExplorer = null;
  let provinceMarkerMarkup = [], regionMarkerMarkup = [], provinceCenters = new Map();
  const mapView = {x:0,y:0,width:1000,height:760};
  let mapZoom = 1, mapDrag = null;
  const zoomInButton = el('#zoomIn'), zoomOutButton = el('#zoomOut'), zoomResetButton = el('#zoomReset'), mapLabel = el('.map-label');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const localName = name => language === 'en' ? (provinceNames[name] || name) : name;
  const regionName = region => language === 'en' ? region.en : region.zh;
  const culturalRegionByName = new Map(culturalRegions.map(region => [region.en, region]));
  const safeURL = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : '#'; } catch { return '#'; } };

  function layoutCulturalMarkers(maxCount) {
    const markers = culturalRegions.map(region => {
      const [x,y] = region.center;
      return {region, targetX:x, targetY:y, x, y, radius:10 + Math.sqrt(region.count / maxCount) * 13, labelBox:null};
    });
    for (let iteration = 0; iteration < 220; iteration++) {
      for (let i = 0; i < markers.length; i++) for (let j = i + 1; j < markers.length; j++) {
        const a = markers[i], b = markers[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        let distance = Math.hypot(dx,dy);
        const minimum = a.radius + b.radius + 13;
        if (distance >= minimum) continue;
        if (distance < .01) { dx = (i % 2 ? -1 : 1); dy = (j % 2 ? -1 : 1); distance = Math.hypot(dx,dy); }
        const push = (minimum - distance) * .52;
        a.x -= dx / distance * push; a.y -= dy / distance * push;
        b.x += dx / distance * push; b.y += dy / distance * push;
      }
      for (const marker of markers) {
        marker.x += (marker.targetX - marker.x) * .025;
        marker.y += (marker.targetY - marker.y) * .025;
        marker.x = Math.max(marker.radius + 14, Math.min(986 - marker.radius, marker.x));
        marker.y = Math.max(marker.radius + 28, Math.min(732 - marker.radius, marker.y));
      }
    }
    const directions = [
      {dx:1,dy:0,anchor:'start'}, {dx:-1,dy:0,anchor:'end'},
      {dx:0,dy:-1,anchor:'middle'}, {dx:0,dy:1,anchor:'middle'},
      {dx:1,dy:-1,anchor:'start'}, {dx:-1,dy:-1,anchor:'end'},
      {dx:1,dy:1,anchor:'start'}, {dx:-1,dy:1,anchor:'end'}
    ];
    const ordered = [...markers].sort((a,b) => Math.max(b.region.en.length,b.region.zh.length)-Math.max(a.region.en.length,a.region.zh.length));
    const placedLabels = [];
    for (const marker of ordered) {
      const labelWidth = Math.max([...marker.region.en].reduce((sum,char) => sum + (/\p{Script=Han}/u.test(char) ? 10 : 6.1),0), [...marker.region.zh].length * 10);
      const options = directions.map((direction,index) => {
        const gap = marker.radius + 10;
        const x = marker.x + direction.dx * gap, y = marker.y + direction.dy * gap + (direction.dy === 0 ? 4 : direction.dy * 2);
        const left = direction.anchor === 'start' ? x : direction.anchor === 'end' ? x-labelWidth : x-labelWidth/2;
        const box = {left,right:left+labelWidth,top:y-11,bottom:y+4,x,y,anchor:direction.anchor};
        let score = index * .15;
        if (box.left < 12 || box.right > 988 || box.top < 24 || box.bottom > 742) score += 5000;
        for (const other of markers) {
          if (other === marker) continue;
          const nearestX = Math.max(box.left,Math.min(other.x,box.right));
          const nearestY = Math.max(box.top,Math.min(other.y,box.bottom));
          if (Math.hypot(nearestX-other.x,nearestY-other.y) < other.radius + 3) score += 3000;
        }
        for (const other of placedLabels) if (box.left < other.right+3 && box.right+3 > other.left && box.top < other.bottom+3 && box.bottom+3 > other.top) score += 2500;
        return {box,score};
      }).sort((a,b) => a.score-b.score)[0];
      marker.labelBox = options.box;
      placedLabels.push(options.box);
    }
    return markers;
  }

  function renderMapView() {
    if (mapSvg) mapSvg.setAttribute('viewBox', `${mapView.x} ${mapView.y} ${mapView.width} ${mapView.height}`);
  }
  function setMapZoom(nextZoom, reset = false) {
    const selectedMarker = !reset && selected ? mapSvg?.querySelector('.province-marker.selected .marker-core') : null;
    const centerX = selectedMarker ? Number(selectedMarker.getAttribute('cx')) : mapView.x + mapView.width / 2;
    const centerY = selectedMarker ? Number(selectedMarker.getAttribute('cy')) : mapView.y + mapView.height / 2;
    mapZoom = Math.max(1, Math.min(4, nextZoom));
    mapView.width = 1000 / mapZoom;
    mapView.height = 760 / mapZoom;
    mapView.x = reset ? (1000 - mapView.width) / 2 : Math.max(0, Math.min(1000 - mapView.width, centerX - mapView.width / 2));
    mapView.y = reset ? (760 - mapView.height) / 2 : Math.max(0, Math.min(760 - mapView.height, centerY - mapView.height / 2));
    renderMapView();
    zoomInButton.disabled = mapZoom >= 4;
    zoomOutButton.disabled = mapZoom <= 1;
  }
  zoomInButton.addEventListener('click', () => setMapZoom(mapZoom * 1.4));
  zoomOutButton.addEventListener('click', () => setMapZoom(mapZoom / 1.4));
  zoomResetButton.addEventListener('click', () => viewMode === 'provinces' ? returnToRegions() : setMapZoom(1, true));

  function updateSelectOptions() {
    const current = viewMode === 'regions' ? activeRegion : selected;
    select.innerHTML = `<option value="">${viewMode === 'regions' ? labels[language].choose : labels[language].chooseOne}</option>`;
    if (viewMode === 'regions') {
      for (const region of culturalRegions) {
        const option = document.createElement('option');
        option.value = region.key;
        option.textContent = `${regionName(region)} · ${region.count ?? 0}`;
        select.append(option);
      }
      select.value = current || '';
    } else {
      const region = culturalRegions.find(item => item.key === activeRegion);
      for (const name of region?.provinces || []) {
        if (!byProvince.has(name)) continue;
        const option = document.createElement('option');
        option.value = name;
        option.textContent = `${localName(name)} · ${region.provinceCounts.get(name) ?? byProvince.get(name).count}`;
        select.append(option);
      }
      select.value = current || '';
    }
  }

  function applyLanguage() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh' ? '中国色彩区域' : 'China’s Colour Regions';
    document.querySelectorAll('[data-i18n]').forEach(node => { node.innerHTML = labels[language][node.dataset.i18n]; });
    langButton.textContent = language === 'en' ? '中文' : 'English';
    langButton.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
    zoomInButton.setAttribute('aria-label', language === 'en' ? 'Zoom in' : '放大地图');
    zoomOutButton.setAttribute('aria-label', language === 'en' ? 'Zoom out' : '缩小地图');
    zoomResetButton.textContent = viewMode === 'provinces' ? labels[language].back : (language === 'en' ? 'Reset' : '重置');
    zoomResetButton.setAttribute('aria-label', viewMode === 'provinces' ? labels[language].back : (language === 'en' ? 'Reset map zoom' : '重置地图缩放'));
    select.setAttribute('aria-label', labels[language].selectProvince);
    if (mapLabel) {
      const focusedRegion = culturalRegions.find(region => region.key === activeRegion);
      mapLabel.textContent = viewMode === 'regions' ? labels[language].mapLabel : `${regionName(focusedRegion)} · ${language === 'en' ? 'PROVINCES · RECORDINGS' : '省级地区 · 曲目数量'}`;
    }
    updateSelectOptions();
    if (allData) {
      mapRoot.querySelectorAll('.province-marker').forEach(marker => { marker.setAttribute('aria-label', `${localName(marker.dataset.name)}: ${byProvince.get(marker.dataset.name)?.count ?? 0} ${labels[language].recordingCount}`); marker.querySelector('title').textContent = `${localName(marker.dataset.name)} · ${byProvince.get(marker.dataset.name)?.count ?? 0}`; });
      mapRoot.querySelectorAll('.region-marker').forEach(marker => { const region = culturalRegions.find(item => item.key === marker.dataset.region); marker.setAttribute('aria-label', `${regionName(region)}: ${region.count} ${labels[language].recordingCount}`); marker.querySelector('title').textContent = `${regionName(region)} · ${region.count}`; marker.querySelector('.region-name-label').textContent = regionName(region); });
      datasetNote.textContent = `${allData.total.toLocaleString()} ${labels[language].recordingCount}`;
      if (tagExplorer) renderTagExplorer(tagExplorer);
      else if (selected) renderProvince(selected);
      else if (activeRegion && viewMode === 'provinces') renderRegion(activeRegion);
      else resetDetails();
    }
  }
  langButton.addEventListener('click', () => { language = language === 'en' ? 'zh' : 'en'; applyLanguage(); });

  function project(lon, lat) {
    const radians = Math.max(-85, Math.min(85, lat)) * Math.PI / 180;
    return [lon * Math.PI / 180, Math.log(Math.tan(Math.PI / 4 + radians / 2))];
  }
  function positions(geometry, out = []) {
    const visit = value => {
      if (typeof value?.[0] === 'number' && typeof value?.[1] === 'number') out.push(project(value[0], value[1]));
      else if (Array.isArray(value)) value.forEach(visit);
    };
    visit(geometry.coordinates);
    return out;
  }
  function collectRings(coordinates, out = []) {
    if (Array.isArray(coordinates?.[0]?.[0])) coordinates.forEach(value => collectRings(value, out));
    else if (Array.isArray(coordinates?.[0]) && typeof coordinates[0][0] === 'number') out.push(coordinates);
    return out;
  }
  function renderPath(geometry, xy) {
    return collectRings(geometry.coordinates).map(ring => ring.map((point, i) => {
      const [x,y] = xy(project(point[0], point[1]));
      return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ') + 'Z').join(' ');
  }
  function translationCache() {
    try { return JSON.parse(localStorage.getItem('sound-atlas-zh-en-cache') || '{}'); } catch { return {}; }
  }
  let titleTranslations = translationCache();
  async function translateText(text) {
    if (!/[\u3400-\u9fff]/.test(text)) return text;
    if (titleTranslations[text]) return titleTranslations[text];
    // Translation is requested only when the reader chooses English; the map itself is local and CDN-free.
    try {
      const url = new URL('https://translate.googleapis.com/translate_a/single');
      url.search = new URLSearchParams({client:'gtx',sl:'zh-CN',tl:'en',dt:'t',q:text});
      const response = await fetch(url);
      if (!response.ok) return text;
      const result = await response.json();
      const translated = result[0].map(part => part[0]).join('').trim();
      if (!translated) return text;
      titleTranslations[text] = translated;
      try { localStorage.setItem('sound-atlas-zh-en-cache', JSON.stringify(titleTranslations)); } catch {}
      return translated;
    } catch { return text; }
  }

  function tagData(province) {
    const counts = new Map();
    for (const song of province.songs) {
      const ethnicGroup = cleanEthnicity(song.ethnicGroup);
      const entries = [
        ['region', song.region],
        ['genre', song.genre],
        ['ethnicity', ethnicGroup],
        ['performance', song.performance],
        ['place', song.place]
      ];
      for (const [type, original] of entries) if (original) {
        if (type === 'place' && (isGenericPlace(original) || isNoisyPlace(original))) continue;
        const value = displayTag(type, original, song);
        if (!value) continue;
        const key = `${type}\u0000${original}`;
        const current = counts.get(key) || {type, value, original, count:0};
        current.count++;
        counts.set(key, current);
      }
    }
    return [...counts.values()].sort((a,b) => b.count-a.count || a.type.localeCompare(b.type)).slice(0,18);
  }
  function translateEthnicLocally(value, translatedGroups = {}) {
    if (!value) return value;
    return String(value).split(/[／/]/).map(part => ethnicEnglish[part.trim()] || translatedGroups[part.trim()] || part.trim()).join(' / ');
  }
  function cleanEthnicity(value) {
    if (!value) return '';
    return String(value).split(/\s*汉语歌曲编译|\s*歌词编译/)[0].trim();
  }
  function displayTag(type, original, song) {
    if (type === 'region') return language === 'zh' ? (song.regionNative || original) : original;
    if (language === 'zh') return type === 'place' ? localizedPlace(original) : original;
    if (type === 'ethnicity') return translateEthnicLocally(original, tagTranslations.ethnicGroup || {});
    if (type === 'performance') return performanceEnglish[original] || tagTranslations.performance?.[original] || original;
    if (type === 'genre') return refineGenreTranslation(original, tagTranslations.genre?.[original] || original);
    return tagTranslations[type]?.[original] || original;
  }
  function refineGenreTranslation(original, translated) {
    const exact = {'小调':'Folk tune (xiaodiao)','山歌':'Mountain song','花儿':'Hua’er folk song','六盘山花儿':'Liupan Mountain Hua’er songs','信天游':'Xintianyou folk song','锡林郭勒长调':'Xilin Gol long song','科尔沁短调':'Horqin short song','侗族大歌':'Grand song of the Dong','江南小调':'Jiangnan folk tune','哭嫁歌':'Wedding lament song','号子':'Work chant','童谣':'Children’s song','酒歌':'Drinking song','堆谐':'Duixie song and dance','长调':'Long song','短调':'Short song','渔歌':'Fishermen’s song','弦子':'Tibetan Xianzi song and dance','锅庄':'Guozhuang song and dance'};
    if (exact[original]) return exact[original];
    let result = translated;
    if (original.includes('花儿')) result = result.replace(/flower(?:s)?/ig, 'Hua’er');
    if (original.includes('长调')) result = result.replace(/long tune/ig, 'long song');
    if (original.includes('短调')) result = result.replace(/short tune/ig, 'short song');
    if (original.includes('山歌')) result = result.replace(/folk song/ig, 'mountain song');
    if (original.includes('小调')) result = result.replace(/minor key|minor tune/ig, 'folk tune');
    if (original.includes('号子')) result = result.replace(/work song/ig, 'work chant');
    if (original.includes('号子')) result = result.replace(/\bno\.?\b|\bnumber\b/ig, 'work chant');
    if (original.includes('堆谐')) result = result.replace(/stacking/ig, 'Duixie');
    if (original.includes('渔歌')) result = result.replace(/fishing song/ig, 'fishermen’s song');
    if (original.includes('哭嫁歌')) result = result.replace(/crying wedding song/ig, 'wedding lament song');
    if (original.includes('童谣')) result = result.replace(/nursery rhymes?/ig, 'children’s song');
    return result;
  }
  function localizedPlace(value) {
    if (!value || language !== 'zh') return value;
    return String(value).replace(/\s·\sprovince$/i,' · 省级地区').replace(/\s·\sprefecture$/i,' · 地级行政区').replace(/\s·\scounty$/i,' · 县级行政区');
  }
  function isGenericPlace(value) {
    const text = String(value).trim().toLowerCase().replace(/\s+/g,' ');
    return new Set(['province','county','prefecture','city','district','township','village','省','县','省级地区','地级行政区','县级行政区','地级市','市','区','乡','村','回族自治区 · province','回族自治区 · 省级地区']).has(text);
  }
  function isNoisyPlace(value) {
    const text = String(value).trim();
    return text.length > 100 || /https?:\/\/|ethnicity:|lyrics:|region:|folk music|music video/i.test(text);
  }
  function songTagValue(song, type) {
    if (type === 'region') return song.region || '';
    if (type === 'genre') return song.genre || '';
    if (type === 'ethnicity') return cleanEthnicity(song.ethnicGroup);
    if (type === 'performance') return song.performance || '';
    if (type === 'place') return song.place || '';
    return '';
  }
  function songsForTag(type, original, provinceName) {
    const groups = new Map();
    for (const province of allData?.provinces || []) {
      if (province.province !== provinceName) continue;
      for (const song of province.songs || []) {
      const value = songTagValue(song, type);
      if (value !== original || (type === 'place' && (isGenericPlace(value) || isNoisyPlace(value)))) continue;
      if (!groups.has(province.province)) groups.set(province.province, []);
      groups.get(province.province).push(song);
      }
    }
    return [...groups.entries()].map(([province, songs]) => ({province, songs})).sort((a,b) => b.songs.length-a.songs.length || a.province.localeCompare(b.province,'zh'));
  }
  function openTagExplorer(tag, provinceName) {
    if (!tag || !provinceName) return;
    tagExplorer = {type:tag.type, original:tag.original, value:tag.value, province:provinceName};
    selected = provinceName;
    select.value = provinceName;
    mapRoot.querySelectorAll('.province-marker').forEach(marker => marker.classList.toggle('selected', marker.dataset.name === provinceName));
    renderTagExplorer(tagExplorer);
  }
  function renderTagExplorer(state) {
    if (!state || !allData) return;
    const groups = songsForTag(state.type, state.original, state.province);
    const total = groups.reduce((sum,group) => sum + group.songs.length, 0);
    const example = groups[0]?.songs[0];
    const value = example ? displayTag(state.type, state.original, example) : state.value;
    const renderId = `tag-${Date.now()}`;
    details.dataset.renderId = renderId;
    details.closest('.panel')?.classList.add('tag-explorer-open');
    let index = 0;
    const groupMarkup = groups.map(group => `<section class="tag-result-group"><div class="tag-result-heading"><h3>${esc(localName(group.province))}</h3><span>${group.songs.length.toLocaleString()} ${language === 'en' ? 'recordings' : '首曲目'}</span></div><div class="song-list">${group.songs.map(song => { const titleIndex = index++; return `<article class="song"><a href="${safeURL(song.url)}" target="_blank" rel="noreferrer"><span class="tag-result-song-title" data-tag-title-index="${titleIndex}">${esc(song.title || song.videoTitle || 'Untitled recording')}</span> ↗</a><div class="song-meta">${[song.region, song.place, song.genre, song.ethnicGroup].filter(Boolean).map(esc).join(' · ')}</div></article>`; }).join('')}</div></section>`).join('');
    details.innerHTML = `<button class="tag-back" type="button">← ${labels[language].backToProvince} ${esc(localName(state.province))}</button><div class="eyebrow tag-explorer-label">${labels[language].tagExplorer}</div><h2 class="province-title tag-explorer-title">${esc(value)}</h2><div class="province-count">${esc(labels[language][state.type])} · ${esc(localName(state.province))} · ${language === 'en' ? `${total.toLocaleString()} ${labels.en.tagMatches}` : `${labels.zh.tagMatches} ${total.toLocaleString()}`}</div><p class="tag-source-hint">${labels[language].tagSourceHint}</p><div class="region-heading">${language === 'en' ? `MATCHING SONGS RECORDED IN ${esc(localName(state.province)).toUpperCase()}` : `${esc(localName(state.province))}采录的匹配曲目`}</div><div class="tag-results">${groupMarkup || `<div class="hint">${language === 'en' ? 'No matching recordings found.' : '未找到匹配曲目。'}</div>`}</div>`;
    details.closest('.panel')?.classList.add('tag-explorer-open');
    if (details.closest('.panel')) details.closest('.panel').scrollTop = 0;
    details.querySelector('.tag-back').addEventListener('click', () => {
      tagExplorer = null;
      details.closest('.panel')?.classList.remove('tag-explorer-open');
      select.value = state.province;
      renderProvince(state.province);
    });
    if (language === 'en') {
      const nodes = [...details.querySelectorAll('[data-tag-title-index]')];
      const songs = groups.flatMap(group => group.songs);
      let cursor = 0;
      const translateWorker = async () => {
        while (cursor < songs.length) {
          const i = cursor++, song = songs[i], node = nodes[i];
          const originalTitle = song.title || song.videoTitle || 'Untitled recording';
          if (!node || !/[\u3400-\u9fff]/.test(originalTitle)) continue;
          const translated = tagTranslations.title?.[originalTitle] || await translateText(originalTitle);
          if (details.dataset.renderId === renderId && translated !== originalTitle) { node.textContent = translated; node.title = `Original: ${originalTitle}`; }
        }
      };
      void Promise.all([translateWorker(),translateWorker(),translateWorker()]);
    }
  }
  function renderProvince(name) {
    const province = byProvince.get(name);
    if (!province) return;
    details.closest('.panel')?.classList.remove('tag-explorer-open');
    const renderId = `${name}-${Date.now()}`;
    details.dataset.renderId = renderId;
    const tags = tagData(province);
    const songs = province.songs;
    details.innerHTML = `<h2 class="province-title">${esc(localName(province.province))}</h2><div class="province-count">${province.count} ${labels[language].recordingCount} · ${songs.length} ${language === 'en' ? 'song titles' : '个曲名'}</div><div class="region-heading">${labels[language].tagCount}</div><p class="tag-scope-note">${language === 'en' ? `Counts are from recordings in ${esc(localName(province.province))} only. Cultural-region labels describe how those local recordings are classified.` : `标签统计仅来自${esc(localName(province.province))}的曲目；文化区域标签表示这些本地曲目的分类。`}</p><div class="tag-cloud">${tags.map((tag,i) => `<button class="tag tag-${esc(tag.type)}" type="button" data-tag-button="${i}" aria-label="${esc(labels[language][tag.type])}: ${esc(tag.value)}; ${tag.count} recordings"><small>${labels[language][tag.type]}</small><span class="tag-value" data-tag-index="${i}" title="${language === 'en' && tag.original !== tag.value ? `Original: ${esc(tag.original)}` : ''}">${esc(tag.value)}</span>${tag.count > 1 ? `<b>×${tag.count}</b>` : ''}</button>`).join('')}</div><div class="region-heading">${labels[language].recordings}</div>${language === 'en' ? `<div class="translation-note">${labels.en.machine}</div>` : ''}<div class="song-list">${songs.map((song,i) => `<article class="song"><a href="${safeURL(song.url)}" target="_blank" rel="noreferrer"><span class="song-title" data-title-index="${i}">${esc(song.title || song.videoTitle || 'Untitled recording')}</span> ↗</a><div class="song-meta">${[song.region, song.place, song.genre, song.ethnicGroup].filter(Boolean).map(esc).join(' · ')}</div></article>`).join('')}</div>`;
    if (details.closest('.panel')) details.closest('.panel').scrollTop = 0;
    details.querySelectorAll('[data-tag-button]').forEach(button => button.addEventListener('click', () => openTagExplorer(tags[Number(button.dataset.tagButton)], name)));
    if (language === 'en') {
      const nodes = [...details.querySelectorAll('[data-title-index]')];
      let cursor = 0;
      const translateWorker = async () => {
        while (cursor < songs.length) {
          const index = cursor++;
          const song = songs[index], node = nodes[index];
          const original = song.title || song.videoTitle || 'Untitled recording';
          if (!node || !/[\u3400-\u9fff]/.test(original)) continue;
          const translated = tagTranslations.title?.[original] || await translateText(original);
          if (details.dataset.renderId === renderId && translated !== original) { node.textContent = translated; node.title = `Original: ${original}`; }
        }
      };
      void Promise.all([translateWorker(), translateWorker(), translateWorker()]);
      const tagNodes = [...details.querySelectorAll('[data-tag-index]')];
      let tagCursor = 0;
      const translateTagWorker = async () => {
        while (tagCursor < tags.length) {
          const index = tagCursor++;
          const tag = tags[index], node = tagNodes[index];
          if (!node || !/[\u3400-\u9fff]/.test(tag.value)) continue;
          const translated = await translateText(tag.value);
          if (details.dataset.renderId === renderId && translated !== tag.value) {
            node.textContent = translated;
            node.closest('.tag')?.setAttribute('aria-label', `${labels[language][tag.type]}: ${translated}; ${tag.count} recordings`);
          }
        }
      };
      void Promise.all([translateTagWorker(),translateTagWorker(),translateTagWorker()]);
    }
  }
  function resetDetails() {
    if (tagExplorer) return;
    if (selected) { select.value = selected; renderProvince(selected); return; }
    if (viewMode === 'provinces' && activeRegion) { select.value = ''; renderRegion(activeRegion); return; }
    select.value = '';
    details.innerHTML = `<div class="empty"><span class="compass">✳</span><h2>${labels[language].start}</h2><p>${labels[language].startText}</p><div class="hint">${labels[language].hint}</div></div>`;
  }
  function renderRegion(key) {
    const region = culturalRegions.find(item => item.key === key);
    if (!region) return;
    details.closest('.panel')?.classList.remove('tag-explorer-open');
    const provinces = region.provinces.map(name => ({province:byProvince.get(name), count:region.provinceCounts.get(name) || 0})).filter(item => item.province).sort((a,b) => b.count-a.count);
    const recorded = provinces.length;
    details.innerHTML = `<h2 class="province-title">${esc(regionName(region))}</h2><div class="province-count">${region.count.toLocaleString()} ${labels[language].recordingCount} · ${recorded} ${labels[language].regionTotal}</div><div class="region-heading">${language === 'en' ? 'PROVINCES WITH RECORDINGS IN THIS CULTURAL REGION' : '该文化区域的采录省级地区'}</div><div class="region-provinces">${provinces.map(item => `<button class="region-province" type="button" data-province="${esc(item.province.province)}"><span>${esc(localName(item.province.province))}</span><b>${item.count.toLocaleString()}</b></button>`).join('')}</div><div class="hint">${language === 'en' ? 'Choose a province to open its songs and dataset tags.' : '选择省级地区以查看曲目与数据标签。'}</div>`;
    details.querySelectorAll('.region-province').forEach(button => button.addEventListener('click', () => chooseProvince(button.dataset.province)));
  }
  function focusProvince(name) { if (tagExplorer) return; lastHovered = name; select.value = name; renderProvince(name); }
  function chooseProvince(name) {
    tagExplorer = null;
    details.closest('.panel')?.classList.remove('tag-explorer-open');
    selected = name;
    select.value = name;
    mapRoot.querySelectorAll('.province-marker').forEach(marker => marker.classList.toggle('selected', marker.dataset.name === name));
    if (name) renderProvince(name); else resetDetails();
  }
  function focusRegion(key) {
    const region = culturalRegions.find(item => item.key === key);
    if (!region) return;
    lastHovered = key;
    select.value = key;
    renderRegion(key);
  }
  function openRegion(key) {
    const region = culturalRegions.find(item => item.key === key);
    if (!region) return;
    viewMode = 'provinces';
    tagExplorer = null;
    activeRegion = key;
    selected = '';
    drawMarkers('provinces', key);
    updateSelectOptions();
    if (mapLabel) mapLabel.textContent = `${regionName(region)} · ${language === 'en' ? 'PROVINCES · RECORDINGS' : '省级地区 · 曲目数量'}`;
    zoomToRegion(key);
    renderRegion(key);
    zoomResetButton.textContent = labels[language].back;
    zoomResetButton.setAttribute('aria-label', labels[language].back);
  }
  function returnToRegions() {
    viewMode = 'regions';
    tagExplorer = null;
    activeRegion = '';
    selected = '';
    lastHovered = '';
    drawMarkers('regions');
    updateSelectOptions();
    setMapZoom(1, true);
    if (mapLabel) mapLabel.textContent = labels[language].mapLabel;
    zoomResetButton.textContent = language === 'en' ? 'Reset' : '重置';
    zoomResetButton.setAttribute('aria-label', language === 'en' ? 'Reset map zoom' : '重置地图缩放');
    resetDetails();
  }
  function bindRegion(element) {
    const key = element.dataset.region;
    element.addEventListener('pointerenter', () => focusRegion(key));
    element.addEventListener('pointerleave', () => { lastHovered = ''; resetDetails(); });
    element.addEventListener('focus', () => focusRegion(key));
    element.addEventListener('blur', () => { lastHovered = ''; resetDetails(); });
    element.addEventListener('click', () => openRegion(key));
    element.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openRegion(key); } });
  }
  function drawMarkers(mode, regionKey = '') {
    const layer = mapSvg?.querySelector('.marker-layer');
    if (!layer) return;
    if (mode === 'regions') {
      layer.innerHTML = regionMarkerMarkup.join('');
      mapRoot.querySelectorAll('.region-marker').forEach(bindRegion);
    } else {
      const region = culturalRegions.find(item => item.key === regionKey);
      layer.innerHTML = provinceMarkerMarkup.filter(item => region?.provinces.includes(item.name)).map(item => item.html).join('');
      mapRoot.querySelectorAll('.province-marker').forEach(bindProvince);
    }
  }
  function zoomToRegion(key) {
      const region = culturalRegions.find(item => item.key === key);
    const points = region?.provinces.map(name => provinceCenters.get(name)).filter(Boolean) || [];
    if (!points.length) return;
    const xs = points.map(point => point[0]), ys = points.map(point => point[1]);
    const centerX = (Math.min(...xs) + Math.max(...xs)) / 2, centerY = (Math.min(...ys) + Math.max(...ys)) / 2;
    const ratio = 1000 / 760;
    let width = Math.max(420, Math.max(...xs) - Math.min(...xs) + 150);
    let height = Math.max(320, Math.max(...ys) - Math.min(...ys) + 130);
    width = Math.max(width, height * ratio);
    height = width / ratio;
    mapView.width = Math.min(1000, width);
    mapView.height = Math.min(760, height);
    mapView.x = Math.max(0, Math.min(1000 - mapView.width, centerX - mapView.width / 2));
    mapView.y = Math.max(0, Math.min(760 - mapView.height, centerY - mapView.height / 2));
    mapZoom = 1000 / mapView.width;
    renderMapView();
    zoomInButton.disabled = mapZoom >= 4;
    zoomOutButton.disabled = mapZoom <= 1;
  }
  function bindProvince(element) {
    const name = element.dataset.name;
    element.addEventListener('pointerenter', () => focusProvince(name));
    element.addEventListener('pointerleave', () => { lastHovered = ''; resetDetails(); });
    element.addEventListener('focus', () => focusProvince(name));
    element.addEventListener('blur', () => { lastHovered = ''; resetDetails(); });
    element.addEventListener('click', () => chooseProvince(name));
    element.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); chooseProvince(name); } });
  }
  function showError(message) {
    details.innerHTML = `<div class="empty"><span class="compass">!</span><h2>Map couldn’t load</h2><p>${esc(message)}</p><div class="hint">Open through the local server, not directly as a file.</div></div>`;
    datasetNote.textContent = 'Map failed to load';
  }

  Promise.all([fetch('./provinces.geojson'), fetch('./data.json'), fetch('./tag-translations-en.json')])
    .then(async ([geoResponse, dataResponse, translationResponse]) => {
      if (!geoResponse.ok || !dataResponse.ok) throw new Error('Could not find data.json or provinces.geojson. Run the local server in the folder containing index.html.');
      const [geo,data] = await Promise.all([geoResponse.json(),dataResponse.json()]);
      const translations = translationResponse.ok ? await translationResponse.json() : {};
      return [geo,data,translations];
    })
    .then(([geo,data,translations]) => {
      allData = data;
      tagTranslations = translations;
      byProvince = new Map(data.provinces.map(province => [province.province, province]));
      for (const province of data.provinces) for (const entry of province.regions || []) {
        const region = culturalRegionByName.get(entry.name);
        if (!region) continue;
        region.count += entry.count;
        region.provinceCounts.set(province.province, entry.count);
      }
      for (const region of culturalRegions) region.provinces = [...region.provinceCounts.keys()];
      const counts = new Map(data.features.map(feature => [feature.province,feature.count]));
      const features = geo.features.filter(feature => /^\d{6}$/.test(String(feature.properties?.code)) && Number(feature.properties.code) % 10000 === 0);
      // The source includes hundreds of tiny South China Sea fragments in Hainan's
      // multipolygon. Keep Hainan Island for the overview; remote fragments create
      // a misleadingly large blank southern margin and are not legible at this scale.
      const mapGeometry = feature => {
        const geometry = feature.geometry;
        if (feature.properties?.name !== '海南省' || geometry.type !== 'MultiPolygon') return geometry;
        const polygonArea = polygon => {
          const ring = polygon[0];
          let area = 0;
          for (let i = 1; i < ring.length; i++) area += ring[i-1][0] * ring[i][1] - ring[i][0] * ring[i-1][1];
          return Math.abs(area / 2);
        };
        const mainIsland = geometry.coordinates.reduce((best, polygon) => polygonArea(polygon) > polygonArea(best) ? polygon : best);
        return {...geometry, coordinates:[mainIsland]};
      };
      const mapFeatures = features.map(feature => ({...feature, mapGeometry:mapGeometry(feature)}));
      const projected = mapFeatures.flatMap(feature => positions(feature.mapGeometry));
      const bounds = [Math.min(...projected.map(point => point[0])),Math.min(...projected.map(point => point[1])),Math.max(...projected.map(point => point[0])),Math.max(...projected.map(point => point[1]))];
      const width = 1000, height = 760, padding = 24;
      const scale = Math.min((width-padding*2)/(bounds[2]-bounds[0]),(height-padding*2)/(bounds[3]-bounds[1]));
      const left = (width-(bounds[2]-bounds[0])*scale)/2, top = (height-(bounds[3]-bounds[1])*scale)/2;
      const xy = ([x,y]) => [left+(x-bounds[0])*scale,height-top-(y-bounds[1])*scale];
      const maxCount = Math.max(...counts.values(),1);
      const provinceShapes = [];
      const provinceMarkers = [];
      mapFeatures.forEach(feature => {
        const name = feature.properties.name;
        const points = positions(feature.mapGeometry);
        const center = points.reduce((sum,point) => [sum[0]+point[0],sum[1]+point[1]],[0,0]).map(value => value/points.length);
        const [cx,cy] = xy(center), count = counts.get(name)||0;
        const radius = 4 + Math.sqrt(count/maxCount)*15;
        const color = '#8799BA';
        provinceCenters.set(name, [cx,cy]);
        const boundary = '#F6F4EE';
        provinceShapes.push(`<path class="province-shape" fill="#C7D2E7" stroke="${boundary}" stroke-width="1.15" d="${renderPath(feature.mapGeometry,xy)}"></path>`);
        provinceMarkers.push({name,html:`<g class="province-marker${selected===name?' selected':''}" data-name="${esc(name)}" tabindex="0" role="button" aria-label="${esc(localName(name))}: ${count} ${labels[language].recordingCount}"><title>${esc(localName(name))} · ${count}</title><circle class="marker-halo" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(radius+1.5).toFixed(1)}"></circle><circle class="marker-core" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${radius.toFixed(1)}" fill="${color}"></circle><text class="marker-count" x="${cx.toFixed(1)}" y="${cy.toFixed(1)}">${count}</text></g>`});
      });
      for (const region of culturalRegions) {
        let x = 0, y = 0, weight = 0;
        for (const [name,count] of region.provinceCounts) {
          const center = provinceCenters.get(name);
          if (!center) continue;
          x += center[0] * count; y += center[1] * count; weight += count;
        }
        region.center = weight ? [x/weight,y/weight] : [500,380];
      }
      const maxRegionCount = Math.max(1,...culturalRegions.map(region => region.count));
      const laidOutMarkers = layoutCulturalMarkers(maxRegionCount);
      for (const marker of laidOutMarkers) {
        const {region,x,y,targetX,targetY,radius,labelBox} = marker;
        const leader = Math.hypot(x-targetX,y-targetY) > 18 ? `<line class="region-marker-leader" x1="${targetX.toFixed(1)}" y1="${targetY.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"></line>` : '';
        regionMarkerMarkup.push(`<g class="region-marker" data-region="${region.key}" tabindex="0" role="button" aria-label="${esc(regionName(region))}: ${region.count} ${labels[language].recordingCount}"><title>${esc(regionName(region))} · ${region.count}</title>${leader}<circle class="region-marker-halo" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(radius+1.5).toFixed(1)}"></circle><circle class="region-marker-core" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(1)}" fill="${region.color}"></circle><text class="marker-count" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${region.count}</text><text class="region-name-label" x="${labelBox.x.toFixed(1)}" y="${labelBox.y.toFixed(1)}" text-anchor="${labelBox.anchor}">${esc(regionName(region))}</text></g>`);
      }
      provinceMarkerMarkup = provinceMarkers;
      mapRoot.innerHTML = `<svg class="province-map" viewBox="0 ${0} ${width} ${height}" role="img" aria-label="Interactive map of China’s 15 cultural regions and provinces"><g class="province-layer">${provinceShapes.join('')}</g><g class="marker-layer"></g></svg>`;
      mapSvg = mapRoot.querySelector('.province-map');
      drawMarkers('regions');
      setMapZoom(1, true);
      mapSvg.addEventListener('pointerdown', event => {
        if (event.target.closest('.province-marker') || mapZoom <= 1) return;
        mapDrag = {pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,viewX:mapView.x,viewY:mapView.y};
        mapSvg.setPointerCapture(event.pointerId);
        mapSvg.classList.add('is-panning');
      });
      mapSvg.addEventListener('pointermove', event => {
        if (!mapDrag || event.pointerId !== mapDrag.pointerId) return;
        const rect = mapSvg.getBoundingClientRect();
        const dx = (mapDrag.startX - event.clientX) * mapView.width / rect.width;
        const dy = (mapDrag.startY - event.clientY) * mapView.height / rect.height;
        mapView.x = Math.max(0, Math.min(1000 - mapView.width, mapDrag.viewX + dx));
        mapView.y = Math.max(0, Math.min(760 - mapView.height, mapDrag.viewY + dy));
        renderMapView();
      });
      const endPan = event => {
        if (!mapDrag || event.pointerId !== mapDrag.pointerId) return;
        mapDrag = null;
        mapSvg.classList.remove('is-panning');
      };
      mapSvg.addEventListener('pointerup', endPan);
      mapSvg.addEventListener('pointercancel', endPan);
      applyLanguage();
    })
    .catch(error => { showError(error.message); console.error(error); });
  select.addEventListener('change', () => { if (viewMode === 'regions') { if (select.value) openRegion(select.value); } else chooseProvince(select.value); });
  applyLanguage();
})();
