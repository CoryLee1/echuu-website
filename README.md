# Echuu 官网

面向 Original Character 创作者的品牌官网。Vite + React + TypeScript，静态构建。

> 这是**独立仓库**。产品 app 在 `nextjs-vtuber-mocap/echuu-ux-r3f-vite`，本仓库不改动它。
> 站点 base 为 `/website/`，可以挂在现有域名下而不占用 `/` 的直播产品入口。

## 运行

```bash
npm install
npm run dev        # http://localhost:5180/website/
npm run build      # 产出 dist/
npm run preview    # 预览构建结果
npm run check      # 类型检查
npm run audit:assets   # 核对 asset-manifest.json 里的文件是否存在
```

## 路径

| 路径 | 内容 |
|---|---|
| `/website/{zh-CN\|ja\|en\|ko}/` | 首页 |
| `/website/{locale}/gallery` | 角色展示 |
| `/website/{locale}/creators` | 创作者合作 |
| `/website/{locale}/journal` | 创作日志 |
| `/website/{locale}/feedback` | 意见箱 |
| `/website/{locale}/doodle` | 涂鸦小角落 |
| `/website/{locale}/moodboard` | **内部** moodboard（noindex，不在导航与 sitemap 中） |
| `/website/legal/*.html` | 现有条款文件原样提供 |

访问 `/website/` 会按已保存选择或浏览器语言跳转，不按 IP 强制跳转。

## 配置

全部集中在 `src/config/site.ts`，通过环境变量覆盖：

| 变量 | 作用 | 未设置时 |
|---|---|---|
| `VITE_SITE_ORIGIN` | 正式域名 | 不输出 canonical / hreflang |
| `VITE_BETA_SIGNUP_ENDPOINT` | 内测报名接口 | 全站 CTA 切换为邮件申请 |
| `VITE_FEEDBACK_ENDPOINT` | 意见箱接口 | 意见箱只提供邮件与复制 |
| `VITE_BRAND_FONT_LICENSED` | 品牌英文字体已获商业授权 | 字体仅作本地预览 |

## 发布闸门

```bash
npm run build:release
```

条款未定稿、域名未配置、字体授权未确认或素材权利有冲突时会**拒绝构建**并列出原因。
本地预览（`npm run dev` / `npm run build`）不受影响。

## 交接文件

| 文件 | 内容 |
|---|---|
| `docs/source-audit.md` | 已核对事实 / 未证实项 / **三处权利冲突** |
| `docs/OPEN_ITEMS.md` | 需要团队补齐或决定的事项 |
| `docs/copy-deck.md` | 四语文案表与术语表 |
| `docs/storyboard.md` | 网页分镜 S01–S10 实现对照 |
| `docs/video-cut.md` | 介绍视频剪辑表（未产出成片） |
| `docs/VERIFICATION.md` | 验证记录 |
| `asset-manifest.json` | 素材清单与权利状态 |

## 当前状态

**本地实现完成、外部服务未接通、未发布。** 详见 `docs/VERIFICATION.md`。
