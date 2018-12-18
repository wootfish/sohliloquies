---
layout: post
title: Efficient Size Estimation for Kademlia-Style Peer Swarms
date: '2018-11-24'
author: Eli Sohl
---


<h5 id="noscript_notice">Note: This post uses MathJax to typeset equations. You will need to enable JavaScript for these to render properly.</h5>
<script src="/sohliloquies/assets/js/noscriptnoticer.js"></script>

How do you figure out the size of a peer swarm without counting all the peers in it?

In a big swarm with lots of peers, counting them all would take a long time (and would involve a ton of network traffic). Plus, anyone who joins or leaves the swarm while you're counting would throw off your final answer, meaning all you're left with in the end is a close estimate of network size. Clearly counting all your peers isn't a viable option for large networks.

A better idea: First, try to model the distribution of peers in the whole network. Then, measure their distribution in a part of the network, and extrapolate based on that.

If the swarm has a routing overlay and peers are evenly distributed throughout the routing space, then a simple trade-off is available: instead of counting peers in the whole routing space, you could take (say) half the space and enumerate the peers in there, then multiply that count by two. Or, enumerate a tenth of the space and multiply by ten -- or enumerate $1/2^{10}$th of the space and multiply by $2^{10}$ -- or so on. The smaller the subspace you're counting peers in, the faster you'll get an estimate, but the more noisy your estimate will be.

This is a better method than counting everyone, but it poses significant challenges of its own: check out [this](#https://www.cs.helsinki.fi/u/lxwang/publications/P2P2013_13.pdf) paper for an example. The authors were studying Mainline DHT, a large, Kademlia-based system. A number of earlier studies on measuring that network's size had already been published. However, it turns out that this prior research had been failing to correct for the fact that, since everyone in the network has imperfect routing info, any attempt at walking regions of the address space will necessarily miss some peers -- a mistake that was leading to massive underestimates of network size. It turns out that this is a hard mistake to fix, though the authors do give some suggestions for how to work around it.

The thing is, basing an estimate on a walk of an address _range_ in an overlay optimized for looking up _specific addresses_ means trying to get information that the routing overlay was never optimized to give you. A natural follow-up question, then, is: can we build a different size estimation methodology which uses the information the overlay is designed to provide? In other words, can we figure out a way to make network size estimates using the results of recursive address lookups? Yes, it turns out -- we can.

Before going further, let's take a moment to review an important terminological distinction: that between _peers_ and _nodes_. A _peer_ is a distinct network entity, a program listening on a port. Nodes, on the other hand, are entities run by peers, and are responsible for actually storing some of the DHT's data. They nominate themselves for a random chunk of the data by picking a _node address_ and storing data keyed to nearby addresses. Nearly all Kademlia-style systems establish a one-to-one correspondence between peers and nodes, but Theseus does not: in Theseus, a peer may possess and operate many nodes. This distinction is important because nodes, not peers, are returned from routing queries.

<h6>TODO: finish & write up analysis on peers vs nodes in routing query results</h6>

If we assume even distribution of peers in a Kademlia-style, $xor$-based $L$-bit routing space, then (since $xor$ is bijective) the distances $d_1, \ldots d_n$ of each of the network's $n$ nodes' addresses from any arbitrary target address $t$ will be evenly distributed integers in the range $[0, 2^L)$.

A common series of college-level stats textbook problems is: first, find the expected value for the minimum of $n$ real numbers uniformly sampled from $(0, 1)$, the answer being $\frac{1}{n+1}$; next, find a general formula for the expected value of the $i$th-least of these numbers (this one's $\frac{i}{n+1}$); finally, find a general model for the distribution of the $i$th-least of these numbers (it's the beta distribution with shape parameters $k$ and $n-i+1$). We only need the first two of these results here, although the third is useful in establishing confidence intervals for Sybil detection.

Entries in a sorted list like this are known as _order statistics_. Calculating or modeling the minimum (or _first order statistic_) or maximum (_nth order statistic_) of such a list is straightforward in both the discrete and continuous cases. In the continuous case, the middle values are equivalently easy to find. In the discrete case, however, the math gets very messy very fast as you move in from the list's edges.

Luckily, we can make a simplification. Suppose we define $o_i$ as the $i$th order statistic for our distances $d_1, \ldots, d_n$, and define $r_1, \ldots, r_n$ such that $r_i = o_i / 2^L$. These random variables $r$ are discrete, but they may be (somewhat) closely approximated by continuous variables in the same range. The closeness of this approximation is discussed after the derivation.

Recall that in the continuous case, the expectations for these variables are $r_i = \frac{i}{n+1}$. We can turn this equation around to get an expectation for the network size: $n = \frac{i}{r_i} - 1$.

A Kademlia address lookup will reliably result in a list of the $k$ closest nodes to a given address. Each of the addresses returned corresponds to a distance, and thus $k$ estimates of network size may be derived. These estimates may be consolidated either through an arithmetic average or a least-squares fit, the latter of which produces significantly more accurate results.

For least-squares, all we're looking for is a univariate fit on $n$. A closed-form expression exists for this, and the derivation is as follows:

Let $e_i$ denote the $i$th error term. Then $e_i = r_i - \frac{i}{n+1}$, and the total error is $\sum_{i=1}^k {e_i}^2$.

The fit is optimal when $sum_{i=1}^k (e_i)^2$ is minimized, which happens when the partial derivative of that sum with respect to $n$ is zero.

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

This gives the value of n for which the squared errors on each distance in the lookup are collectively minimized.

In this way, the information from any address lookup can be used to generate a quick estimate of network size.

<h6>TODO: how are these estimates distributed?</h6>

The variance on these estimates is non-negligible, although it does decrease as `k` increases. Better results may also be achieved by running a number of lookups in parallel and taking the median of their resulting size estimates.

<h6>TODO: experimental validation indicated that this has a consistent bias. Need to revisit this research, add documentation of this trend, discuss possible causes, and look into the possibility of deriving some sort of correction factor</h6>
