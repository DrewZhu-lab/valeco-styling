import type { Lang } from './i18n'

export const galleryCopy = {
  en: {
    collection: 'The collection', photos: 'spaces',
    hint: 'Choose a room to explore its collection. Drag each slider to compare before and after, or open a larger view.',
    previous: 'Previous photograph', next: 'Next photograph', open: 'View photograph', close: 'Close photograph',
    comparisons: 'Before & after', comparisonIntro: 'Explore our styling concepts with interactive before-and-after comparisons (demo imagery).',
    rooms: {
      living: ['Living & lounge', 'Comfortable spaces, thoughtfully layered for everyday living.'],
      dining: ['Dining', 'Inviting settings for gathering around the table.'],
      kitchen: ['Kitchen', 'Simple details that bring warmth to the heart of the home.'],
      bedroom: ['Bedroom', 'Soft textures and considered details for a restful retreat.'],
      entry: ['Entry & details', 'A welcoming first impression, down to the smallest detail.'],
      bathroom: ['Bathroom', 'Fresh, calm spaces with a carefully finished touch.'],
      outdoor: ['Outdoor', 'Open-air spaces that feel like an extension of the home.'],
    },
    kinds: { living: 'Living room', lounge: 'Lounge', family: 'Family room', dining: 'Dining room', casualDining: 'Casual dining', kitchen: 'Kitchen', bedroom: 'Bedroom', masterBedroom: 'Master bedroom', entry: 'Console & details', bathroom: 'Bathroom', outdoor: 'Outdoor' },
  },
  zh: {
    collection: '空间作品集', photos: '组作品',
    hint: '选择区域，单独浏览该区域的作品。拖动每张图片的滑块查看布置前后，点击放大按钮查看细节。',
    previous: '上一张照片', next: '下一张照片', open: '放大查看照片', close: '关闭照片',
    comparisons: '布置前后对比', comparisonIntro: '拖动滑块，探索不同空间的软装设计构想（示意素材）。',
    rooms: {
      living: ['客厅与会客区', '以舒适的家具和丰富的层次，营造自在的日常空间。'],
      dining: ['餐厅', '围坐餐桌，让相聚时刻更有温度。'],
      kitchen: ['厨房', '用简洁细节，为家的中心增添暖意。'],
      bedroom: ['卧室', '柔软织物与精心搭配，构成安静的休憩空间。'],
      entry: ['玄关与陈设', '从第一眼印象到每一处细节，都值得用心。'],
      bathroom: ['浴室', '清爽、宁静，以细节完成空间的质感。'],
      outdoor: ['户外', '让庭院和露台成为家居生活的自然延伸。'],
    },
    kinds: { living: '客厅', lounge: '会客区', family: '家庭起居室', dining: '餐厅', casualDining: '休闲餐区', kitchen: '厨房', bedroom: '卧室', masterBedroom: '主卧', entry: '玄关陈设', bathroom: '浴室', outdoor: '户外' },
  },
  zhHant: {
    collection: '空間作品集', photos: '組作品',
    hint: '選擇區域，單獨瀏覽該區域的作品。拖動每張圖片的滑塊查看佈置前後，點擊放大按鈕查看細節。',
    previous: '上一張照片', next: '下一張照片', open: '放大查看照片', close: '關閉照片',
    comparisons: '佈置前後對比', comparisonIntro: '拖動滑塊，探索不同空間的軟裝設計構想（示意素材）。',
    rooms: {
      living: ['客廳與會客區', '以舒適的家具和豐富的層次，營造自在的日常空間。'],
      dining: ['餐廳', '圍坐餐桌，讓相聚時刻更有溫度。'],
      kitchen: ['廚房', '用簡潔細節，為家的中心增添暖意。'],
      bedroom: ['臥室', '柔軟織物與精心搭配，構成安靜的休憩空間。'],
      entry: ['玄關與陳設', '從第一眼印象到每一處細節，都值得用心。'],
      bathroom: ['浴室', '清爽、寧靜，以細節完成空間的質感。'],
      outdoor: ['戶外', '讓庭院和露台成為家居生活的自然延伸。'],
    },
    kinds: { living: '客廳', lounge: '會客區', family: '家庭起居室', dining: '餐廳', casualDining: '休閒餐區', kitchen: '廚房', bedroom: '臥室', masterBedroom: '主臥', entry: '玄關陳設', bathroom: '浴室', outdoor: '戶外' },
  },
  ko: {
    collection: '스타일링 컬렉션', photos: '개의 공간',
    hint: '공간을 선택해 해당 컬렉션을 둘러보세요. 각 슬라이더로 전후를 비교하거나 확대해서 보세요.',
    previous: '이전 사진', next: '다음 사진', open: '사진 크게 보기', close: '사진 닫기',
    comparisons: '스타일링 전후 비교', comparisonIntro: '슬라이더를 움직여 공간별 스타일링 아이디어를 살펴보세요(데모 이미지).',
    rooms: {
      living: ['거실 & 라운지', '편안한 가구와 세심한 레이어링으로 완성한 일상 공간.'],
      dining: ['다이닝', '식탁에 모이는 시간을 위한 따뜻한 공간.'],
      kitchen: ['주방', '간결한 디테일로 집의 중심에 온기를 더합니다.'],
      bedroom: ['침실', '부드러운 질감과 세심한 디테일로 완성한 휴식 공간.'],
      entry: ['현관 & 디테일', '첫인상부터 작은 디테일까지 따뜻하게.'],
      bathroom: ['욕실', '세심한 마무리가 돋보이는 산뜻하고 차분한 공간.'],
      outdoor: ['야외', '집 안의 편안함이 자연스럽게 이어지는 야외 공간.'],
    },
    kinds: { living: '거실', lounge: '라운지', family: '패밀리룸', dining: '다이닝룸', casualDining: '캐주얼 다이닝', kitchen: '주방', bedroom: '침실', masterBedroom: '안방', entry: '콘솔 & 디테일', bathroom: '욕실', outdoor: '야외' },
  },
} satisfies Record<Lang, unknown>

export type GalleryCopy = (typeof galleryCopy)[Lang]
