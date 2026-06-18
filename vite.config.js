/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 加载环境变量，如果 .env 文件不存在则使用默认值
  const env = loadEnv(mode, process.cwd(), "");
  const siteName = env.VITE_SITE_NAME || "無名の主页";
  const siteDes = env.VITE_SITE_DES || "一个默默无闻的主页";

  return defineConfig({
    define: {
      // 为 index.html 中的占位符提供默认值
      "import.meta.env.VITE_SITE_NAME": JSON.stringify(siteName),
      "import.meta.env.VITE_SITE_DES": JSON.stringify(siteDes),
      "import.meta.env.VITE_SITE_AUTHOR": JSON.stringify(env.VITE_SITE_AUTHOR || "無名"),
      "import.meta.env.VITE_SITE_KEYWORDS": JSON.stringify(env.VITE_SITE_KEYWORDS || "無名,个人主页"),
      "import.meta.env.VITE_SITE_LOGO": JSON.stringify(env.VITE_SITE_LOGO || "/images/icon/favicon.ico"),
      "import.meta.env.VITE_SITE_APPLE_LOGO": JSON.stringify(env.VITE_SITE_APPLE_LOGO || "/images/logo/apple-touch-icon.png"),
      "import.meta.env.VITE_SITE_URL": JSON.stringify(env.VITE_SITE_URL || ""),
      "import.meta.env.VITE_WEATHER_KEY": JSON.stringify(env.VITE_WEATHER_KEY || ""),
      "import.meta.env.VITE_SITE_START": JSON.stringify(env.VITE_SITE_START || ""),
      "import.meta.env.VITE_SITE_ICP": JSON.stringify(env.VITE_SITE_ICP || ""),
      "import.meta.env.VITE_SONG_API": JSON.stringify(env.VITE_SONG_API || ""),
      "import.meta.env.VITE_SONG_SERVER": JSON.stringify(env.VITE_SONG_SERVER || "netease"),
      "import.meta.env.VITE_SONG_TYPE": JSON.stringify(env.VITE_SONG_TYPE || "playlist"),
      "import.meta.env.VITE_SONG_ID": JSON.stringify(env.VITE_SONG_ID || ""),
      "import.meta.env.VITE_DESC_HELLO": JSON.stringify(env.VITE_DESC_HELLO || "Hello World !"),
      "import.meta.env.VITE_DESC_TEXT": JSON.stringify(env.VITE_DESC_TEXT || "一个建立于 21 世纪的小站，存活于互联网的边缘"),
      "import.meta.env.VITE_DESC_HELLO_OTHER": JSON.stringify(env.VITE_DESC_HELLO_OTHER || "Oops !"),
      "import.meta.env.VITE_DESC_TEXT_OTHER": JSON.stringify(env.VITE_DESC_TEXT_OTHER || "哎呀，这都被你发现了（ 再点击一次可关闭 ）"),
      "import.meta.env.VITE_SITE_MAIN_LOGO": JSON.stringify(env.VITE_SITE_MAIN_LOGO || "/images/icon/logo.png"),
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/, // js / css 静态资源缓存
              handler: "CacheFirst",
              options: {
                cacheName: "js-css-cache",
              },
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
              handler: "CacheFirst",
              options: {
                cacheName: "image-cache",
              },
            },
          ],
        },
        manifest: {
          name: siteName,
          short_name: siteName,
          description: siteDes,
          display: "standalone",
          start_url: "/",
          theme_color: "#424242",
          background_color: "#424242",
          icons: [
            {
              src: "/images/icon/48.png",
              sizes: "48x48",
              type: "image/png",
            },
            {
              src: "/images/icon/72.png",
              sizes: "72x72",
              type: "image/png",
            },
            {
              src: "/images/icon/96.png",
              sizes: "96x96",
              type: "image/png",
            },
            {
              src: "/images/icon/128.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: "/images/icon/144.png",
              sizes: "144x144",
              type: "image/png",
            },
            {
              src: "/images/icon/192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/images/icon/512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
      viteCompression(),
    ],
    server: {
      port: "3000",
      open: true,
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `@use "./src/style/global.scss" as *;`,
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"],
        },
      },
    },
  });
};
