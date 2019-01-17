---
layout: post
title: Efficient Size Estimation for Peer Swarms With XOR Routing
author: Eli Sohl
description: How do you figure out the size of a peer swarm without counting all the peers in it?
---


<h5 id="noscript_notice">Note: This post uses MathJax to typeset equations. You will need to enable JavaScript for these to render properly.</h5>
<script src="/sohliloquies/assets/js/noscriptnoticer.js"></script>

How do you figure out the size of a peer swarm without counting all the peers in it?

In a big swarm with lots of peers, counting them all would take a long time (and would involve a ton of network traffic). Plus, anyone who joins or leaves the swarm while you're counting would throw off your final answer. Clearly, counting all your peers isn't a viable option for large networks.

A better idea: Try to model the distribution of peers in the whole network. Then, measure their distribution in a part of the network, and extrapolate based on your measurements.

Let's make things more concrete by setting some assumptions, namely that we're working with a peer swarm using Kademlia-style $xor$ routing, as described [here](http://www.scs.stanford.edu/~dm/home/papers/kpos.pdf) (PDF link). The most common strategy in this style of network has been to try to walk a certain $n$-bit subspace of the $L$-bit address space, then to multiply the number of nodes found by $2^{L-n}$ to get an estimate for the full network. This strategy may sound too simple to fail, but fail it does: [in 2013 this method was shown to result in significant underestimates of network size](https://www.cs.helsinki.fi/u/lxwang/publications/P2P2013_13.pdf) (PDF link). The reason is that since every node has imperfect routing info, any walk is statistically likely to miss some of the nodes in a region. This turns out to be a hard flaw to address; the best the cited paper has to offer is a somewhat involved technique for determining a "correction factor" to try and adjust for the error factor.

Walking address ranges is not what Kademlia's routing function is designed for; it is designed for looking up specific addresses, which it turns out to be significantly better at doing. Much more is known about writing [optimal algorithms for address lookups](https://gnunet.org/sites/default/files/SKademlia2007.pdf) (PDF link), as well. So how about trying to extrapolate a size estimate from address lookup results?

Before going further, let's take a moment to review an important terminological distinction: that between _peers_ and _nodes_. A _peer_ is a distinct network entity, a program listening on a port. Nodes, on the other hand, are entities run by peers, and are responsible for actually storing some of the DHT's data. They nominate themselves for a random chunk of the data by picking a _node address_ and storing data keyed to nearby addresses. Nearly all Kademlia-style systems establish a one-to-one correspondence between peers and nodes, but Theseus does not: in Theseus, a peer may possess and operate many nodes. This distinction is important because nodes, not peers, are returned from routing queries.

If we assume even distribution of nodes in a Kademlia-style, $xor$-based $L$-bit routing space, then (since $xor$ is bijective) the distances of each of the network's $n$ nodes' addresses from any arbitrary target address $t$ will be evenly distributed integers in the range $[0, 2^L)$. Let $d_1, \ldots, d_n$ denote these distances, arranged in ascending order, i.e. let $d_i$ be the $i$th-least of the distances. Then define $r_1, \ldots, r_n$ such that $r_i = d_n / 2^L$, so that each $r_i$ is normalized to the range $(0, 1)$.

These random variables $r_i$ are discrete, and their distribution is algebraically unwieldy. However, these discrete variables' behavior may be very closely approximated by continuous variables with much cleaner algebraic representations.

The expected value the $i$th-least of $n$ reals sampled evenly from $(0, 1)$ is $\frac{i}{n+1}$. Thus, $\mathbf{E}(r_i) \approx \frac{i}{n+1}$.

We can turn this equation around: $n \approx \frac{i}{\mathbf{E}(r_i)} - 1$.







Some textbook stats problems for you: first, find the expected value for the minimum of $n$ real numbers uniformly sampled from $(0, 1)$. Spoiler: $\frac{1}{n+1}$. Next, find a general expression for the expected value of the $i$th-least of these numbers. This one's $\frac{i}{n+1}$. Finally, find a general model for the distribution of the $i$th-least of these numbers. It turns out to follow the beta distribution with shape parameters $k$ and $n-i+1$.












Luckily, we can make a simplification. Suppose we define $o_i$ as the $i$th order statistic for our distances $d_1, \ldots, d_n$, and define $r_1, \ldots, r_n$ such that $r_i = o_i / 2^L$. These random variables $r$ are discrete, but they may be (somewhat) closely approximated by continuous variables in the same range. The closeness of this approximation is discussed after the derivation.

Recall that in the continuous case, the expectations for these variables are $r_i = \frac{i}{n+1}$. We can turn this equation around to get an expectation for the network size: $n = \frac{i}{r_i} - 1$.

A Kademlia address lookup will reliably result in a list of the $k$ closest nodes to a given address. Each of the addresses returned corresponds to a distance, and thus $k$ estimates of network size may be derived. These estimates may be consolidated either through an arithmetic average or a least-squares fit, the latter of which produces significantly more accurate results.

For least-squares, all we're looking for is a univariate fit on $n$. A closed-form expression exists for this, and the derivation is as follows:

Let $e_i$ denote the $i$th error term. Then $e_i = r_i - \frac{i}{n+1}$, and the total error is $\sum_{i=1}^k {e_i}^2$.

The fit is optimal when total error is minimized, which happens when the partial derivative of that sum with respect to $n$ is zero.

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

This gives the value of $n$ for which the squared errors on each distance in the lookup are collectively minimized.

In this way, the information from any address lookup can be used to generate a quick estimate of network size.

The variance on these estimates is non-negligible, although it does decrease as $k$ increases. Better results may also be achieved by running a number of lookups in parallel and synthesizing an overall estimate by combining their results.

Combining the results of simultaneous lookups is nontrivial. Typical central tendencies like the mean, median, and mode all fail: mean and median because the distribution of estimates is skewed, mode because realistic sample sizes are prohibitively small. Luckily, a better option is available.
