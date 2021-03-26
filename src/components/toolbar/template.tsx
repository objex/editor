import {h} from '../../utils'

export function renderToolbar() {
  return (
    <div class="flex item-center py-1.5 px-4 bg-gray-100 space-x-1.5">
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M5.833 4.167h5a2.917 2.917 0 110 5.833h-5V4.167z"/>
          <path d="M10.833 10h.834a2.917 2.917 0 010 5.833H5.833V10"/>
        </svg>
      </button>
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.167 4.167h5M5.833 15.833h5M11.667 4.167L8.333 15.833"/>
        </svg>
      </button>
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M5.833 4.167v7.5a4.167 4.167 0 008.334 0v-7.5M3.333 10h13.334"/>
        </svg>
      </button>

      <div>
        <div class="w-px h-full bg-gray-300 mx-2"/>
      </div>

      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M16.333 15V8.333L14.667 10M3.833 5v10M10.5 5v10m-.833 0h1.666M3 15h1.667m-.834-5H10.5M3 5h1.667m5 0h1.666"/>
        </svg>
      </button>
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.667 10A1.667 1.667 0 0118 10c0 .492-.348 1.098-.68 1.548l-2.653 3.453L18 15M3.833 5v10M10.5 5v10m-.833 0h1.666M3 15h1.667m-.834-5H10.5M3 5h1.667m5 0h1.666"/>
        </svg>
      </button>
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.667 10a1.667 1.667 0 111.666 1.667 1.667 1.667 0 11-1.666 1.666M3.833 5v10M10.5 5v10m-.833 0h1.666M3 15h1.667m-.834-5H10.5M3 5h1.667m5 0h1.666"/>
        </svg>
      </button>
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.167 15V8.333l-3.334 5H18M3.833 5v10M10.5 5v10m-.833 0h1.666M3 15h1.667m-.834-5H10.5M3 5h1.667m5 0h1.666"/>
        </svg>
      </button>

      <div>
        <div class="w-px h-full bg-gray-300 mx-2"/>
      </div>

      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.667 4.167c0-.46.373-.834.833-.834h9.167a.833.833 0 010 1.667H7.5a.833.833 0 01-.833-.833zM3.75 5.417a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm0 5.833a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm0 5.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm2.917-7c0-.46.373-.833.833-.833h9.167a.833.833 0 010 1.666H7.5A.833.833 0 016.667 10zm0 5.833c0-.46.373-.833.833-.833h9.167a.833.833 0 010 1.667H7.5a.833.833 0 01-.833-.834z"/>
        </svg>
      </button>
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.667 4.167c0-.46.373-.834.833-.834h9.167a.833.833 0 010 1.667H7.5a.833.833 0 01-.833-.833zM4.167 2.5V5H5v.833H2.5V5h.833V3.333H2.5V2.5h1.667zM2.5 11.667V9.583h1.667v-.416H2.5v-.834H5v2.084H3.333v.416H5v.834H2.5zm1.667 4.583H2.5v-.833h1.667V15H2.5v-.833H5V17.5H2.5v-.833h1.667v-.417zm2.5-6.25c0-.46.373-.833.833-.833h9.167a.833.833 0 010 1.666H7.5A.833.833 0 016.667 10zm0 5.833c0-.46.373-.833.833-.833h9.167a.833.833 0 010 1.667H7.5a.833.833 0 01-.833-.834z"/>
        </svg>
      </button>
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.82 14.434c-.86-.911-1.32-1.934-1.32-3.591 0-2.736 1.801-5.206 4.482-6.568a.675.675 0 01.87.248c.225.347.103.81-.244 1.037C5.4 6.997 4.928 8.726 4.73 9.852c.447-.232 1.033-.313 1.607-.26 1.504.14 2.689 1.374 2.689 2.908a2.917 2.917 0 01-2.917 2.917c-.894 0-1.749-.409-2.29-.983zm8.332 0c-.858-.911-1.319-1.934-1.319-3.591 0-2.736 1.801-5.206 4.482-6.568a.675.675 0 01.87.248c.225.347.103.81-.243 1.037-2.209 1.437-2.68 3.166-2.879 4.292.448-.232 1.034-.313 1.608-.26 1.503.14 2.688 1.374 2.688 2.908a2.917 2.917 0 01-2.917 2.917c-.894 0-1.749-.409-2.29-.983z"/>
        </svg>
      </button>
      <button class="p-1 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
          <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
        </svg>
      </button>

      <div>
        <div class="w-px h-full bg-gray-300 mx-2"/>
      </div>

      <button class="p-0.5 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
          <path d="M12.5 6.667h.008M14.167 3.333H5.833a2.5 2.5 0 00-2.5 2.5v8.334a2.5 2.5 0 002.5 2.5h8.334a2.5 2.5 0 002.5-2.5V5.833a2.5 2.5 0 00-2.5-2.5z"/>
          <path d="M3.333 12.5l3.334-3.333c.38-.366.81-.559 1.25-.559.438 0 .87.193 1.25.559l4.166 4.166"/>
          <path d="M11.667 11.667l.833-.834c.38-.365.811-.558 1.25-.558.439 0 .87.193 1.25.558l1.667 1.667"/>
        </svg>
      </button>
      <button class="p-0.5 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7">
          <path d="M5.833 6.667L2.5 10l3.333 3.333M14.167 6.667L17.5 10l-3.333 3.333M11.667 3.333L8.333 16.667"/>
        </svg>
      </button>
      <button class="p-0.5 rounded text-gray-500 hover:bg-gray-200 transition duration-100">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7">
          <path d="M16.667 10.833l-3.334 3.334m0-3.334l3.334 3.334-3.334-3.334zM16.667 4.167h-5.834L7.5 15.833l-2.5-5H3.333"/>
        </svg>
      </button>
    </div>
  )
}