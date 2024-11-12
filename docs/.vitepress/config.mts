import { defineConfig } from 'vitepress'

function nav() {
  return [
    { text: '阅读本书', link: '/book/preface' },
    { text: 'Notebooks', link: '/notebooks/chap1/1_1_BackgroundMathematics' }
  ]
}

function bookSidebar() {
  return [
    {
      text: '前言',
      link: '/book/preface'
    },
    {
      text: '第一章 介绍',
      link: '/book/chap1/Introduction',
      items: [
        { text: '监督学习', link: '/book/chap1/Supervised-learning' },
        { text: '无监督学习', link: '/book/chap1/Unsupervised-learning' },
        { text: '强化学习', link: '/book/chap1/Reinforcement-learning' },
        { text: '伦理', link: '/book/chap1/Ethics' },
        { text: '本书结构', link: '/book/chap1/Structure-of-book' },
        { text: '其他书籍', link: '/book/chap1/Other-books' },
        { text: '如何阅读本书', link: '/book/chap1/How-to-read-this-book' },
      ]
    },
    {
      text: '第二章 监督学习',
      link: '/book/chap2/Supervised-learning',
      items: [
        { text: '监督学习概述', link: '/book/chap2/Supervised-learning-overview' },
        { text: '线性回归示例', link: '/book/chap2/Linear-regression-example' },
        { text: '总结', link: '/book/chap2/Summary' },
      ]
    },
    {
      text: '第三章 浅层神经网络',
      link: '/book/chap3/Shallow-neural-networks',
      items: [
        { text: '神经网络示例', link: '/book/chap3/Neural-network-example' },
        { text: '通用逼近定理', link: '/book/chap3/Universal-approximation-theorem' },
        { text: '多变量输入与输出', link: '/book/chap3/Multivariate-inputs-and-outputs' },
      ]
    },
  ]
}

function notebookSidebar() {
  return [
    { 
      text: '第一章', 
      items: [
        { text: '数学背景知识', link: '/notebooks/chap1/1_1_BackgroundMathematics' },
      ]
    }
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "理解深度学习",
  description: "UnderstandingDeepLearning中文版",
  lastUpdated: true,
  markdown: {
    math: true
  },
  themeConfig: {
    lastUpdatedText: '最后更新时间',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outlineTitle: '当前页面',
    sidebar: {
      '/book/': bookSidebar(),
      '/notebooks/': notebookSidebar(),
    },
    nav: nav(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neo896/udl-zh' }
    ]
  }
})
