# ポートフォリオ

作品と活動を Markdown で管理する、Astro の静的サイトです。

## 手元で起動する

Node.js 22.23.4 以上が必要です。

```sh
npm install
npm run dev
```

ターミナルに表示されるローカル URL を開きます。

## 作品を追加する

1. [作品テンプレート](templates/project.md)を `src/content/projects/` にコピーし、`my-project.md` のように英小文字・数字・ハイフンで名前を付けます。ファイル名は詳細ページの URL `/projects/my-project/` に使われます。
2. `title`、`summary`、`date`、`status` と、区切り線 `---` の下にある本文を編集します。制作中なら `status: in-progress`、公開済みなら `status: released` を指定します。
3. 画像を載せる場合は `public/images/my-project/` に置き、`image: /images/my-project/cover.webp` のようにパスを書きます。画像の内容を表す `imageAlt` も記入します。
4. トップページに載せる作品は `featured: true` にします。トップには日付が新しい代表作を最大3件表示します。デモなどを案内する場合は `links` に表示名と URL を記入します。
5. 表示を確認できる状態になったら `draft: false` にして、作品一覧 `/projects/` と詳細ページを確認します。

## 活動を追加する

1. [活動テンプレート](templates/activity.md)を `src/content/activities/` にコピーします。ファイル名は `2026-11-21-my-activity.md` のように付けると探しやすくなります。
2. `title`、`date`、`summary` を書き、必要に応じて `links` を追加します。
3. 表示を確認できる状態になったら `draft: false` にして、活動一覧 `/activities/` を確認します。一覧はファイル内の `date` の新しい順に並びます。トップには直近の活動が表示されます。

`date` は `YYYY-MM-DD` で記入します。`draft: true` の作品と活動は、一覧、トップページ、作品の詳細ページから除外されます。

## 初回の差し替えと公開前の確認

- 名前、自己紹介、連絡先は [`src/data/profile.ts`](src/data/profile.ts) で編集します。
- 同梱の制作物と活動は表示例です。ご自身の内容を追加し、表示例の Markdown は削除するか `draft: true` にしてください。
- `npm run check` で Astro と TypeScript の診断を確認します。
- `npm run build` で内容を検証し、静的ファイルを `dist/` に生成します。必須項目のエラーが出た場合は、表示されたファイルと項目を修正してください。
- `npm run preview` で生成結果を開き、一覧の並び、画像、リンク、下書きの扱いを確認します。
