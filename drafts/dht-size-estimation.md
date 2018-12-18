---
layout: post
title: Efficient Size Estimation for Kademlia-Style Peer Swarms
date: '2018-11-24'
author: Eli Sohl
---


<h5 id="noscript_notice">Note: This post uses MathJax to typeset equations. You will need to enable JavaScript for these to render properly.</h5>
<script src="/sohliloquies/assets/js/noscriptnoticer.js"></script>

How do you figure out the size of a peer swarm without counting all the peers in it?

In a big swarm with lots of peers, counting them all would take a long time (and would involve a ton of network traffic). Plus, anyone who joins or leaves the swarm while you're counting would throw off your final answer, meaning all you're left with in the end is a close estimate of network size.

If counting all your peers isn't an option, maybe a better idea is to try to measure the distribution of peers in the network somehow, and to make a guess based on that. 

If the swarm has a routing overlay and peers are evenly distributed throughout the routing space, then a simple trade-off is available: instead of counting peers in the whole routing space, you could take half the space and enumerate the peers in there, then multiply that count by two. Or, enumerate a tenth of the space and multiply by ten -- or enumerate 1/1024th of the space and multiply by 1024 -- or so on. The smaller the subspace you're counting peers in, the faster you'll get an estimate (but the more variance you'll have in your estimates' distribution).

Enumerating peers can also be harder than it sounds: check out [this](#https://www.cs.helsinki.fi/u/lxwang/publications/P2P2013_13.pdf) paper for a case study on that. The authors were working with Mainline DHT, a Kademlia variant. A number of prior papers focused on estimating the size of that network had already been published. However, it turns out that this prior research had been failing to correct for the fact that, since everyone in a Kademlia network has imperfect routing info, any attempt at walking the network will necessarily miss some peers -- a mistake that was leading to massive inaccuracies in the previous-best published research.

In short, walking the network is error-prone. Not only that, but it takes a lot of routing queries -- and the more queries you send, the longer your walk takes, the more susceptible you are to peer churn, and the more likely you are to be rate-limited. The fewer queries you send, the more likely you are to miss peers. Either way, you've got problems. Introducing a correction factor, as suggested in that paper, can help adjust for these problems, but it does not outright solve them. Besides, deriving an accurate correction factor can be a challenge in and of itself.

What all this work seems to suggest is that a Kademlia-style, `xor`-based routing function is ill-suited to the task of enumerating all peers in an address _range_. Perhaps this shouldn't be a surprise, since the routing function's only goal is to help with finding the peers closest to any _specific_ address.

Perhaps, then, we would get better results if we could come up with a new method of size estimation based on single-address lookups.

Before going further, let's take a moment to review an important terminological distinction: that between _peers_ and _nodes_. A _peer_ is a distinct network entity, a program listening on a port. Nodes, on the other hand, are entities run by peers, and are responsible for actually storing some of the DHT's data. They nominate themselves for a random chunk of the data by picking a _node address_ and storing data keyed to nearby addresses. Nearly all Kademlia-style systems establish a one-to-one correspondence between peers and nodes, but Theseus does not: in Theseus, a peer may possess and operate many nodes. This distinction is important because nodes, not peers, are returned from routing queries.

<h6>TODO: finish & write up analysis on peers vs nodes in routing query results</h6>

If we assume even distribution of peers in a Kademlia-style, `xor`-based `L`-bit routing space, then since `xor` is bijective, the distances $ d_1 $ to $ d_n $ of each of the network's `n` nodes' addresses from any arbitrary target address `t` will be evenly distributed integers in the range $[0, 2^L)$.

A common series of college-level stats textbook problems is: first, find the expected value for the minimum of `n` real numbers uniformly sampled from `(0, 1)` (`1/(n+1)`); next, find a general formula for the expected value of the `i`th-least of these numbers (`i/(n+1)`); finally, find a general model for the distribution of the `i`th-least of these numbers (the beta distribution with shape parameters `k` and `n-i+1`). We only need the first two of these results here, although the third is useful in establishing confidence intervals for Sybil detection.

Entries in a sorted list or this sort are known as _order statistics_. Calculating or modeling the minimum (or _first order statistic_) or maximum (_nth order statistic_) is straightforward in both the discrete and continuous cases. In the continuous case, the middle values are equivalently easy to find. In the discrete case, however, the necessary calculations get more involved the further you get from the list's edges.

Suppose we define `o_i` as the `i`th order statistic for our distances `d_1 ... d_n`, and define `r_1 ... r_n` such that `r_i = o_i / 2^L`. These random variables `r` are discrete, but they may be closely approximated by continuous variables in the range (0, 1).

Recall that in the continuous case, the expectations for these variables are `r_i = i/(n+1)`. We can turn this equation around to get an expectation for the network size `n`: `n = (i / r_i) - 1`.

Any Kademlia lookup results in a list of the `k` closest nodes to a given address. This operation is better-studied and much more reliable (i.e. much more likely to produce a complete and correct list) than the neighborhood-walking operation mentioned above.

Each of the addresses returned corresponds to a distance, and thus `k` estimates of network size may be derived. These estimates may be consolidated either through an average or a least-squares fit, the latter of which produces significantly more accurate results.

We're interested in getting a univariate fit on `n`, for which it turns out that a closed form expression exists. The derivation is as follows:

Let `e_i` denote the `i`th error term, so that the least-squares fit's total error is `Sum_i (e_i)^2`. By definition, `e_i = r_i - i / (n+1)`.

The fit is optimal when `Sum_i (e_i)^2` is minimized, which happens when the partial derivative of that sum with respect to `n` is zero.

$$
\begin{align}
E &= \sum_{i=1}^n e_i^2 \\
&= \sum_{i=1}^n (r_i - \frac{i}{n+1})^2 \\
\frac{\partial E}{\partial n} &= \sum_{i=1}^n 2 (r_i - \frac{i}{n+1}) \frac{i}{(n+1)^2} \\
&= \frac{2}{(n+1)^2} \sum_{i=1}^n (i r_i - \frac{i^2}{n+1})
\end{align}
$$

Setting this equal to zero and solving for n:

$$
\begin{align}
\frac{2}{(n+1)^2} \sum_{i=1}^n (i r_i - \frac{i^2}{n+1}) &= 0 \\
\sum_{i=1}^n (i r_i) - \frac{\sum_{i=1}^n i^2}{n+1} &= 0 \\
\sum_{i=1}^n (i r_i) &= \frac{\sum_{i=1}^n i^2}{n+1} \\
n &= \frac{\sum_{i=1}^n i^2}{\sum_{i=1}^n i r_i}
\end{align}
$$





 up with `n = k(k+1)(2k+1)/(6 Sum_i (i*r_i)) - 1`.

In this way, the data from any address lookup can be used to generate an estimate of network size. (TODO: how are these estimates distributed?) 

The variance on these estimates is non-negligible, although it does decrease as `k` increases. This can be compensated for, however, by running a number of lookups in parallel, calculating estimates of `n` from each of them, and using the median of these estimates as a final value.

(TODO: experimental validation indicated that this has a consistent bias -- add documentation of this, discuss possible causes, and look into the possibility of deriving some sort of correction factor)
