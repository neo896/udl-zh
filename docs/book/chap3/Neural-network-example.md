浅层神经网络是具有参数 $ϕ$ 的函数 $y = f[x, ϕ]$，它将多变量输入 $x$ 映射到多变量输出 $y$。我们将完整的定义推迟到第3.4节，并通过一个示例网络 $f[x, ϕ]$ 来介绍主要思想，该网络将标量输入 $x$ 映射到标量输出 $y$，并且有十个参数 $ϕ = \{ ϕ_0, ϕ_1, ϕ_2, ϕ_3, θ_{10}, θ_{11}, θ_{20}, θ_{21}, θ_{30}, θ_{31} \}$：
$$ \begin{aligned}
y &= f[x, ϕ] \\
&= ϕ_0 + ϕ_1 a[θ_{10} + θ_{11}x] + ϕ_2 a[θ_{20} + θ_{21}x] + ϕ_3 a[θ_{30} + θ_{31}x].
\end{aligned} \tag{3.1} $$

我们可以将这个计算分解为三个部分：首先，我们计算输入数据的三个线性函数 （$θ_{10} + θ_{11}x$、$θ_{20} + θ_{21}x$ 和 $θ_{30} + θ_{31}x$）。其次，我们将这三个结果通过一个激活函数 $a[•]$ 进行处理。最后，我们用 $ϕ_1$、$ϕ_2$ 和 $ϕ_3$ 对三个激活结果进行加权，将它们求和，然后加上一个偏移量 $ϕ_0$。

为了完成描述，我们必须定义激活函数 $a[•]$。有许多可能性，但最常见的选择是修正线性单元或 ReLU：
$$ a[z] = \text{ReLU}[z] = \begin{cases}
0 &  z < 0 \\
z &  z \geq 0
\end{cases} \tag{3.2} $$

当输入为正数时返回输入值，否则返回零（见图3.1）。

公式 3.1 所代表的是哪一类输入/输出关系可能并不明显。尽管如此，前一章中的所有思想都是适用的。公式3.1代表了一类函数，其中的特定成员取决于 $ϕ$ 中的十个参数。如果我们知道这些参数，我们可以通过评估给定输入 $x$ 的公式来执行推理（预测 $y$）。给定一个训练数据集 $\{ x_i, y_i \}_{i=1}^I$，我们可以定义一个最小二乘损失函数 $L[ϕ]$，并使用它来衡量模型在任何给定参数值 $ϕ$ 下描述这个数据集的有效性。为了训练模型，我们寻找最小化这个损失的值 $\hat{ϕ}$。

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
  <img src="/fig3.1.png" alt="图3.1" style="max-width: 100%;">
  <p style="text-align: center; font-style: italic; color: gray; font-size: 0.9em;"><strong>图 3.1</strong> 修正线性单元（ReLU）。这个激活函数如果输入小于零则返回零，否则返回输入不变。换句话说，它将负值剪切为零。注意，还有许多其他可能的激活函数选择（见图3.13），但ReLU是最常用的，也是最容易理解的。</p>
</div>

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
  <img src="/fig3.2.png" alt="图3.2" style="max-width: 100%;">
  <p style="text-align: center; font-style: italic; color: gray; font-size: 0.9em;"><strong>图 3.2</strong> 根据公式3.1定义的函数族。a-c) 对于十个参数ϕ的三种不同选择，函数的输入/输出关系是分段线性的。然而，连接的位置、它们之间线性区域的斜率以及整体高度各不相同。</p>
</div>

## 神经网络的直观理解

实际上，公式3.1代表了一族具有多达四个线性区域的连续分段线性函数（图3.2）。现在我们来分解公式3.1，并解释它为什么描述了这个函数族。为了使理解更容易，我们将函数分成两部分。首先，我们引入中间量：
$$ \begin{aligned}
h_1 &= a[\theta_{10} + \theta_{11}x] \\
h_2 &= a[\theta_{20} + \theta_{21}x] \\
h_3 &= a[\theta_{30} + \theta_{31}x],
\end{aligned} \tag{3.3} $$

我们把 $h_1$、$h_2$ 和 $h_3$ 称为隐藏单元。其次，我们通过将这些隐藏单元与线性函数组合来计算输出<sup style="color: green;">[1]</sup>：
$$ y = ϕ_0 + ϕ_1 h_1 + ϕ_2 h_2 + ϕ_3 h_3. \tag{3.4} $$

图 3.3 展示了创建图 3.2a 中函数的计算流程。每个隐藏单元都包含输入的线性函数 $θ_{•0} + θ_{•1}x$，该直线被 ReLU 函数 $a[•]$ 在零以下剪裁。三条线穿过零的位置成为最终输出中的三个“连接点”。然后分别通过 $ϕ_1$、$ϕ_2$ 和 $ϕ_3$ 对这三条被剪裁的线进行加权。最后，加上偏移量 $ϕ_0$，它控制着最终函数的整体高度。

图3.3j中的每个线性区域对应于隐藏单元中不同的激活模式。当一个单元被剪切时，我们将其称为非活动状态，而当它没有被剪切时，我们将其称为活动状态。例如，阴影区域接收来自 $h_1$ 和 $h_3$（它们是活动的）的贡献，但不来自 $h_2$（它是非活动的）。每个线性区域的斜率由该区域活动输入的原始斜率 $θ_{•1}$ 和随后应用的权重 $ϕ_{•}$ 决定。例如，阴影区域的斜率是 $θ_{11}ϕ_1 + θ_{31}ϕ_3$，其中第一项是面板(g)中的斜率，第二项是面板(i)中的斜率。

每个隐藏单元对函数贡献一个“联合”，因此有三个隐藏单元时，可以有四个线性区域。然而，这些区域中只有三个的斜率是独立的；第四个要么是零（如果在这个区域中所有隐藏单元都不活跃），要么是其他区域斜率的总和。

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
  <img src="/fig3.3.png" alt="图3.3" style="max-width: 100%;">
  <p style="text-align: center; font-style: italic; color: gray; font-size: 0.9em;"><strong>图 3.3 </strong>图 3.2a 中函数的计算。a - c) 输入 x 通过三个线性函数，每个函数具有不同的 y 轴截距θ₀和斜率θ₁。
d - f) 每条线都通过 ReLU 激活函数，该函数将负值截断为零。g - i) 然后分别通过ϕ₁、ϕ₂ 和ϕ₃ 对这三条截断线进行加权（缩放）。j) 最后，将经过截断和加权后的函数相加，并添加一个控制高度的偏移量ϕ₀。四个线性区域中的每一个都对应于隐藏单元中不同的激活模式。在阴影区域，h₂ 处于非激活状态（被截断），但 h₁ 和 h₃ 都处于激活状态。（<a href="https://udlbook.github.io/udlfigures/">交互式演示</a>）</p>
</div>

::: tip 注
[1] 为了本书的目的，线性函数具有形式 $z' = ϕ_0 + ∑_i ϕ_i z_i$。任何其他类型的函数都是非线性的。例如，ReLU函数（公式3.2）和包含它的示例神经网络（公式3.1）都是非线性的。有关进一步的澄清，请参见章节末尾的注释。
:::

## 描绘神经网络

我们一直在讨论一个具有一个输入、一个输出和三个隐藏单元的神经网络。我们在图3.4a中可视化了这个网络。输入在左边，隐藏单元在中间，输出在右边。每个连接代表十个参数中的一个。为了简化这种表示，我们通常不绘制截距参数，因此这个网络通常如图3.4b所示。

<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
  <img src="/fig3.4.png" alt="图3.4" style="max-width: 100%;">
  <p style="text-align: center; font-style: italic; color: gray; font-size: 0.9em;"><strong>图 3.4 </strong>神经网络的图示说明：
a) 输入x位于左侧，隐藏单元h1、h2和h3位于中间，输出y位于右侧。计算流程从左向右进行。输入用于计算隐藏单元的值，这些隐藏单元的值再组合起来生成输出。图中的十个箭头每个都代表一个参数（橙色表示截距，黑色表示斜率）。每个参数都会与其源节点的值相乘，然后将结果加到其目标节点上。例如，我们将参数ϕ₁与源节点h1相乘，然后将结果加到y上。我们引入了额外的包含1的节点（橙色圆圈）来将偏置项纳入这个框架中，所以我们将ϕ₀乘以1（实际上没有影响）然后加到y上。在隐藏单元处应用ReLU激活函数。
b) 更常见的做法是省略截距、ReLU函数和参数名称；这种更简单的表示方式实际上展示的是相同的网络。</p>
</div>