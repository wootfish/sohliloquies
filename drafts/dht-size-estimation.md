---
layout: post
title: Efficient Size Estimation for Peer Swarms With XOR Routing
author: Eli Sohl
description: How do you figure out the size of a peer swarm without counting all the peers in it?
---


<h5 id="noscript_notice">Note: This post uses MathJax to typeset equations. You will need to enable JavaScript for these to render properly.</h5>
<script src="/sohliloquies/assets/js/noscriptnoticer.js"></script>

How do you figure out the size of a peer swarm without counting all the peers in it?

In a big swarm with lots of peers, counting them all would take a long time (and would involve a ton of network traffic). Plus, anyone who joins or leaves the swarm while you're counting would throw off your final answer. Counting all your peers isn't a viable option for large networks, for these and other reasons.

A better idea: Try to model the distribution of peers in the whole network. Then, measure peers' distribution in a part of the network and extrapolate based on your measurements.

This question is interesting in the general case, but I'm particularly interested in the specific case of peer swarms using Kademlia-style $xor$ routing, [as described here](http://www.scs.stanford.edu/~dm/home/papers/kpos.pdf) (PDF link). Until now, the most common size estimation strategy in this type of network has been to try to walk a certain $n$-bit subspace of the $L$-bit address space, then to multiply the number of nodes found by $2^{L-n}$ to get an estimate for the full network.

This strategy may sound too simple to fail, but in fact it is fatally flawed and has been [shown to result in significant underestimates of network size](https://www.cs.helsinki.fi/u/lxwang/publications/P2P2013_13.pdf) (PDF link). The reason is that since every node has imperfect routing info, any walk is statistically likely to miss some of the nodes in a region. This results in an underestimate of local node density, and of course a local underestimate leads to a global underestimate. This turns out to be a hard flaw to address; the cited paper's best suggestion is a somewhat involved technique for measuring a "correction factor" which tries to adjust for the error factor.

Kademlia's routing function is not designed to walk address ranges; it is designed to look up specific addresses, which it turns out to be significantly better at doing. Much more is known about writing [optimal algorithms for address lookups](https://gnunet.org/sites/default/files/SKademlia2007.pdf) (PDF link) than optimally walking an address range. So, how about extrapolating a size estimate directly from the results of address lookups?

Before going further, let's take a moment to review an important terminological distinction: that between _peers_ and _nodes_. A _peer_ is a distinct network entity, a program listening on a port. Nodes, on the other hand, are entities run by peers. Nodes are responsible for actually storing parts of the DHT's data. Nodes each nominate themselves for a random chunk of the address space by picking a _node address_ and storing data keyed to nearby addresses (with $xor$ as the distance metric). Nearly all Kademlia-style systems establish a one-to-one correspondence between peers and nodes, but in Theseus DHT a peer may possess and operate many nodes. This distinction is important because nodes, not peers, are returned from routing queries.

If we assume even distribution of nodes in a Kademlia-style, $xor$-based $L$-bit routing space, then (since $xor$ is bijective) the distances of each of the network's $n$ nodes' addresses from any arbitrary target address $t$ will be evenly distributed integers in the range $[0, 2^L)$. Let $d_1, \ldots, d_n$ denote these distances, arranged in ascending order, i.e. let $d_i$ be the $i$th-least of the distances. Then define $r_1, \ldots, r_k$ such that $r_i = d_i / 2^L$, so that each $r_i$ is normalized to the range $(0, 1)$.

As is common for order statistics of discrete variables, these variables $r_i$ have unwieldy algebraic representations. However, they may be closely approximated by continuous variables with much cleaner representations.

The expected value the $i$th-least of $n$ reals sampled evenly from $(0, 1)$ is $\frac{i}{n+1}$. Our approximation, then, will be $\mathbf{E}[r_i] \approx \frac{i}{n+1}$.

We can turn this equation around: $\frac{i}{\mathbf{E}[r_i]} - 1 \approx n$. This allows us to convert any measured value of $\mathbf{E}[r_i]$ to a rough network size estimate. The better our measurement, the better the resulting estimate. To get measurements for $\mathbf{E}[r_1], \ldots, \mathbf{E}[r_k]$, all we have to do is run some lookups and take averages of all measured values for $r_1$, $r_2$, etc.

Each variable $r_i$ yields its own independent size estimate. A few options exist for consolidating these. The most obvious is to take the arithmetic mean across all estimates. This works, but a better method is to compute a least-squares fit for the value of $n$ minimizing the squared error on each estimate $\frac{i}{\mathbf{E}[r_i]} - 1$. The derivation for this estimate's closed form is as follows.

Let $e_i$ denote the $i$th error term. Then $e_i = r_i - \frac{i}{n+1}$, and the total error is $\sum_{i=1}^k {e_i}^2$.

Our fit is optimal when this total error term is minimized. This happens when $\frac{\partial E}{\partial n}$, the total error's partial derivative with respect to $n$, is zero. First, we evaluate the partial derivative:

$$
\begin{align}
E &= \sum_{i=1}^k e_i^2 \\
&= \sum_{i=1}^k (r_i - \frac{i}{n+1})^2 \\
\frac{\partial E}{\partial n} &= \sum_{i=1}^k 2 (r_i - \frac{i}{n+1}) \frac{i}{(n+1)^2} \\
&= \frac{2}{(n+1)^2} \sum_{i=1}^k (i r_i - \frac{i^2}{n+1})
\end{align}
$$

Now set the derivative to zero and solve for n:

$$
\begin{align}
\frac{2}{(n+1)^2} \sum_{i=1}^k (i r_i - \frac{i^2}{n+1}) &= 0 \\
\sum_{i=1}^k i r_i &= \frac{1}{n+1} \sum_{i=1}^k i^2 \\
n &= \frac{\sum_{i=1}^k i^2}{\sum_{i=1}^k i r_i} - 1 \\
&= \frac{k(k+1)(2k+1)}{6 \sum_{i=1}^k i r_i} - 1
\end{align}
$$

This gives the value of $n$ for which the squared errors on each estimate are collectively minimized. In this way, a quick and decently accurate estimate of network size can be produced from nothing more than the results of arbitrary address lookups.

I'll close this out with some cool charts. These are the results of some empirical tests I ran to validate this methodology. The charts are formatted as histograms of size estimates, with estimated size on the x-axis and probability density on the y-axis. Size estimates obtained by least-squares fit are shown in green; the results of using an arithmetic mean are shown in red. Both are fairly accurate, but the least-squares fit can be seen to have a somewhat tighter distribution across the board. It also produces significantly fewer outliers.

From left to right, we see how estimates vary as the number of queries used to generate each estimate increases. The more queries used, the larger our sample size for measuring each $\mathbf{E}[r_i]$ is, and the lower the variance is on the resulting estimate. Check out how much the charts' ranges decrease from left to right.

From top to bottom, we see what happens as the size of the network increases. Interestingly, in each column, the ratio of variance to network size seems roughly constant.

The top-right corner can also be seen to be exhibiting some really bizarre behavior. I really have no idea what's going on there, but I'm sure there's an interesting reason for it!

(click the image to view a full-size version)

[![Fit results](/sohliloquies/img/dht-size-estimation-charts.png)](/sohliloquies/img/dht-size-estimation-charts.png)
