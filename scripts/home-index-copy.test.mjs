import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const checks = [
  {
    file: '../src/app/page.tsx',
    replacements: [
      ['Embeddingベースのセマンティック評価', '文脈・意図ベースでの評価'],
      ['リンクから「答え」へ。検索のレイヤーが根本から書き換わる。', 'ページリンクから「答え」へ。検索の仕組みが根本から書き変わる。'],
      ['検索の主戦場は SERP から AI Answer Engine へ。Citation がブランド露出の新しい単位になる。', '検索の主戦場は、Google結果画面からAIの回答へ。AIに&quot;引用される&quot;ことが、ブランドの新しい露出指標になる。'],
      ['SEO Era', 'SEO時代'],
      ['AI Answer Era', 'AI Answer時代'],
      ['回答エンジンが直接回答する。Citationこそが露出。', '回答エンジンが直接回答する。AIに引用されることこそが、露出。'],
      ['SERP クリック率の継続的減少', 'SERP クリック率の3年連続で継続的減少'],
      ['Search Path Intelligence', '検索経路探索'],
      ['一次検索だけでなく、後続買問の連鎖を可視化。', '「最初の検索」だけで終わらず、そこから生まれた疑問や調べ直したルートを可視化'],
      ['Semantic GEO Framework', 'GEO Framework'],
      ['Embedding による意味的類似度で、質問とコンテンツの GAP を 12 点モデルで定量評価します。', 'Embedding による意味的類似度で、質問とコンテンツの GAP を10点モデルで定量評価します。'],
      ['GAP Analysis', 'GAP分析'],
      ['12 点 Semantic Score', '10点評価'],
    ],
  },
  {
    file: '../src/components/home/FrameworkSection.tsx',
    replacements: [
      ['Question Intelligence', '質問分析'],
      ['CDJベースの質問生成', 'カスタマージャーニーベースで質問生成'],
      ['Question Cluster', '質問クラスター生成'],
      ['Semantic GAP 分析', 'GAP分析'],
      ['12点評価モデル / Semantic Similarity', '10点評価でスコアリング / 意味的類似度'],
      ['GEO コンテンツエンジニアリング', '実践的なGEO対策'],
    ],
  },
  {
    file: '../Design/hi-fi.jsx',
    replacements: [
      ['Embeddingベースのセマンティック評価', '文脈・意図ベースでの評価'],
      ['リンクから「答え」へ。検索のレイヤーが根本から書き換わる。', 'ページリンクから「答え」へ。検索の仕組みが根本から書き変わる。'],
      ['検索の主戦場は SERP から AI Answer Engine へ。Citation がブランド露出の新しい単位になる。', '検索の主戦場は、Google結果画面からAIの回答へ。AIに"引用される"ことが、ブランドの新しい露出指標になる。'],
      ['SEO Era', 'SEO時代'],
      ['AI Answer Era', 'AI Answer時代'],
      ['回答エンジンが直接回答する。Citationこそが露出。', '回答エンジンが直接回答する。AIに引用されることこそが、露出。'],
      ['SERP クリック率の継続的減少', 'SERP クリック率の3年連続で継続的減少'],
      ['Search Path Intelligence', '検索経路探索'],
      ['一次検索だけでなく、後続質問の連鎖を可視化。', '「最初の検索」だけで終わらず、そこから生まれた疑問や調べ直したルートを可視化'],
      ['Semantic GEO Framework', 'GEO Framework'],
      ['Embedding による意味的類似度で、質問とコンテンツの GAP を 12 点モデルで定量評価します。', 'Embedding による意味的類似度で、質問とコンテンツの GAP を10点モデルで定量評価します。'],
      ['Question Intelligence', '質問分析'],
      ['CDJベースの質問生成', 'カスタマージャーニーベースで質問生成'],
      ['Question Cluster', '質問クラスター生成'],
      ['Semantic GAP 分析', 'GAP分析'],
      ['12点評価モデル / Semantic Similarity', '10点評価でスコアリング / 意味的類似度'],
      ['GEO コンテンツエンジニアリング', '実践的なGEO対策'],
      ['GAP Analysis', 'GAP分析'],
      ['12 点 Semantic Score', '10点評価'],
    ],
  },
]

for (const { file, replacements } of checks) {
  const source = readFileSync(new URL(file, import.meta.url), 'utf8').replace(/\s+/g, ' ')
  for (const [before, after] of replacements) {
    assert.ok(!source.includes(before), `${file} should no longer include: ${before}`)
    assert.ok(source.includes(after), `${file} should include: ${after}`)
  }
}
