这个Python笔记本的目的是确保你能使用CoLab，并让你熟悉一些你需要理解的深度学习的背景数学概念。

这并不意味着它很难，可能你已经知道一些或全部这些信息。

数学不是一项观赏性运动。仅仅通过听讲座或读书，你是学不会它的。真正有助于的是与之互动并亲自探索。

依次运行下面的单元格。在各个地方你会看到“TO DO”这个词。按照这些地方的指示编写代码来完成函数。文本中还穿插了一些问题。如果你发现任何错误或有任何建议，请通过udlbookmail@gmail.com与我联系。

```python
# 导入数学库
import numpy as np
# 导入绘图库
import matplotlib.pyplot as plt
```

**线性函数**
我们将使用线性方程这个术语来指代输入的加权和加上一个偏移量。如果只有一个输入 $x$，那么这就是一条直线：
$$
y = \beta + \omega x, \tag{1}
$$
其中β是直线的y轴截距，ω是直线的斜率。当有两个输入$x_1$和$x_2$时，这就变成了一个平面：
$$
y = \beta + \omega_1 x_1 + \omega_2 x_2, \tag{2}
$$

任何其他函数按定义都是非线性的。

```python
# 定义一个只有一个输入x的线性函数
def linear_function_1D(x,beta,omega):
  # TODO -- 将下面的代码行替换为一维线性方程的公式
  y = x

  return y
```

```python
# 绘制一维线性函数

# 定义一个从0到10，增量为0.01的x值数组
# https://numpy.org/doc/stable/reference/generated/numpy.arange.html
x = np.arange(0.0,10.0, 0.01)
# 使用你上面填充的函数计算y
beta = 0.0; omega = 1.0

y = linear_function_1D(x,beta,omega)

# 绘制这个函数
fig, ax = plt.subplots()
ax.plot(x,y,'r-')
ax.set_ylim([0,10]);ax.set_xlim([0,10])
ax.set_xlabel('x'); ax.set_ylabel('y')
plt.show()

# TODO -- 尝试改变beta和omega的值，以了解它们的作用。
# 试着画一条穿过y轴的直线，y=10，穿过x轴的直线，x=5
```

