# R165 — Preemptive Empirical Evidence Matrix for FP-01…FP-10 Adversarial Arguments

Status: CURRENT EVIDENCE/REVIEW CONTROL
Date: 2026-09-10
Purpose: bind each stated adversarial argument to (a) an external empirical record, (b) the exact current SEAM scope that bears on it, and (c) the remaining falsification boundary. This record does not replace native execution and does not promote compatibility evidence into a numerical prediction.

## A1 — FP-05 / iron allotropy

**Adversarial proposition.** A temperature-free scalar selector cannot accommodate the observed re-entrant iron sequence BCC → FCC → BCC under increasing thermal perturbation.

**External empirical comparator.** NIST Advanced Manufacturing Series 100-14 reports pure iron at normal pressure as BCC at lower temperature, FCC after the lower allotropic transition near 911 °C, BCC again after the upper transition near 1392 °C, and melting near 1536 °C.

**SEAM disposition.** R90 executes a blind principle-level construction in which a strictly monotone perturbation coordinate is supplied to one unchanged scalar argmax and the selected identity returns A → B → A. The empirical iron sequence is admitted only after the native topology is frozen.

**Boundary.** R90 closes the claim of *in-principle incompatibility*. It does not claim first-principles prediction of the numerical Fe transition temperatures or lattice constants.

**Sources.**
- NIST AMS 100-14: https://nvlpubs.nist.gov/nistpubs/ams/NIST.AMS.100-14.pdf
- Internal locked proof: `Evidence/Thermodynamics/R90_FP05_IRON_ALLOTROPY_REENTRANT_SELECTOR_LOCK/LOCKED_PROOF_POINTER.json`

## A2 — FP-08 / Cs-133 metrology circularity

**Adversarial proposition.** The number 9,192,631,770 was historically chosen to preserve continuity with an earlier second, therefore the SEAM count-native time primitive is circularly imported from SI.

**External empirical/metrological record.** BIPM records that the pre-1967 astronomical definitions were replaced by an atomic definition referenced to the Cs-133 ground-state hyperfine transition. The present SI definition fixes the numerical value of ΔνCs at 9,192,631,770 Hz. BIPM also explicitly describes continuity as a design requirement in metrological redefinition.

**SEAM disposition.** The physically counted event is `n_Cs`. The fixed numerical divisor is the conventional-unit mapping of that count into SI seconds; it is not a feedback term that changes the counted event or any upstream structural selection. Historical continuity of the reporting unit therefore does not constitute mathematical circularity in the native count relation.

**Boundary.** This evidence establishes the metrological history and exact present SI mapping. It does not claim that Cs-133 is metaphysically unique; a future SI redefinition would alter the conventional projection while leaving the native count-event concept separable from that projection.

**Sources.**
- BIPM, history of the second: https://www.bipm.org/en/history-si/second
- BIPM, SI base unit second: https://www.bipm.org/en/si-base-units/second
- BIPM, Resolution 1 (1967): https://www.bipm.org/en/-/resolution-cgpm-13-1

## A3 — FP-01/FP-02 / Bell locality challenge

**Adversarial proposition.** Compact support of a SEAM basis/operator is equivalent to Bell-local realism and is therefore excluded by loophole-free Bell tests.

**External empirical comparator.** Hensen et al. (Nature 526, 2015) report a loophole-free CHSH-Bell test with spacelike-separated electron-spin measurements and statistically significant rejection of the local-realist null hypothesis. This observation is accepted as an empirical constraint.

**SEAM disposition.** The archive does not identify compact support of a particular variational/overlap basis with Bell factorization, measurement independence, or a local hidden-variable ontology. The existing S-050 direct-conflict run explicitly admits Bell-violating correlations as valid observed structure while refusing to infer a wavefunction or hidden-variable ontology from the observation alone. Therefore the logical implication `compact support in one operator ⇒ Bell-local hidden-variable theory` is not licensed by the SEAM specification.

**Boundary / falsifier.** If a complete SEAM correlation projection were shown to enforce the Bell-local factorization assumptions and therefore `|S_CHSH| ≤ 2` for the loophole-free experimental contract, FP-01/FP-02 would conflict with observation. The current evidence preempts the *equivalence assertion*, not a future quantitative Bell-correlation test.

**Sources.**
- Hensen et al., Nature 526, 682–686 (2015), DOI 10.1038/nature15759: https://www.nature.com/articles/nature15759
- Internal Bell-evidence ruling: `Evidence/Direct_Conflict/R99_S048_S060/S050_Wavefunction/DIRECT_MANIFOLD_RULING.json`

## A4 — FP-04 / one law versus two operator facets

**Adversarial proposition.** Because a compact-support molecular variational field can vanish after support separation while the long-range attraction branch remains nonzero, SEAM necessarily has two unrelated force laws and contradicts FP-04.

**External empirical comparator.** Experimental/theoretical materials literature routinely distinguishes multiple separation-dependent contributions in the same physical system; NIST references, for example, intermolecular potentials decomposed into short-range repulsion plus smoothly varying long-range attraction, and colloidal systems containing short-range and long-range contributions simultaneously. The empirical existence of different range facets in one physical system therefore does not itself imply two ontologically independent interactions.

**SEAM disposition.** The current technical specification explicitly keeps the v18.6 compact-support selected-state/Hamiltonian branch and the R28→R24 exterior attraction continuation in different operator scopes. It prohibits using the vanishing of one scoped quantity as a theorem that the other vanishes. FP-04 asserts common governing interaction architecture, not equality of every intermediate operator or equality of magnitude.

**Locked closure.** R166 executes the retained R28 pair relation and audits the R24 exterior/body continuation. It verifies that the scoped operators remain non-substitutable while the long-range/body branch traces to the same resolved pair consequence without an independent physical term, `B_attr`, Newtonian `G`, or comparator-fitted coefficient as a native generator. Terminal: `PASS_FP04_ONE_LAW_PRIMITIVE_IDENTITY_FALSIFICATION_CLOSED`.

**Boundary / falsifier.** FP-04 fails if a required interaction regime is shown to require a mutually independent primitive interaction law with no common upstream structural/entropy construction. A scope distinction between derived operators is not sufficient by itself to establish that failure.

**Sources.**
- NIST, intermolecular potential discussion (long-range attraction + short-range repulsion): https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=921173
- NIST, short-range attraction/long-range repulsion systems: https://www.nist.gov/publications/colloidal-systems-short-range-attraction-and-long-range-repulsion-phase-diagrams
- Internal current operator relation: Technical Foundations §O.4.8.3 and R28/R24 evidence.

## A5 — FP-10 / incompleteness converted into untestability

**Adversarial proposition.** Because undeclared objects terminate execution rather than being invented, any missing object becomes a protected non-result and the framework cannot be falsified.

**External empirical challenge class.** Independent databases contain real structures whose existence does not depend on SEAM: graphite and diamond are both carbon; NIST records them as distinct material forms, and NIST/PubChem record stereoisomers and constitutional/relational alternatives with identical elemental formulas (e.g. alanine stereoisomers; C6H12O6 forms such as fructose and other hexoses).

**SEAM disposition.** FP-10 controls executor behavior; it is not the falsification criterion. The falsifier is representational: an independently established persistent structure that cannot be represented by the declared SEAM primitives/relations invalidates the claimed representational completeness at that scope. A missing implementation binding must be reported as missing; it cannot be silently converted into either PASS or FAIL. Conversely, an empirical structure outside the representable state space is a direct failure, not an `INDETERMINATE` escape.

**Boundary.** No finite challenge list proves universal representational completeness. The rule is deliberately asymmetric: missing implementation mathematics is not invented, while an observed structure that lies outside the declared representational space is admissible falsifying evidence.

**Sources.**
- NIST graphite: https://webbook.nist.gov/cgi/cbook.cgi?ID=7782-42-5
- NIST diamond: https://webbook.nist.gov/cgi/cbook.cgi?ID=C7782403
- NIST L-alanine / stereoisomer record: https://webbook.nist.gov/cgi/cbook.cgi?Name=Ala
- NIST fructose, formula C6H12O6: https://webbook.nist.gov/cgi/cbook.cgi?ID=57487

## A6 — FP-03 / Z as imported legacy classification

**Adversarial proposition.** Beginning from `Z` imports a conventional atomic category and therefore reverses FP-09 directionality.

**External empirical comparator.** IUPAC defines atomic number `Z` as proton number, and defines an atom as containing a nucleus of charge `Z e` and `Z` electrons for the neutral atom. NIST likewise notes that equal electron and proton counts give an electrically neutral atom.

**SEAM disposition.** In the constructor, `Z(n)` functions as the integer count/index supplied to the shell-state construction. Conventional atomic-number terminology is a downstream correspondence for that count; the symbol does not supply the shell arrangement, neutron closure, isotope state, or later relational state. Replacing the symbol `Z` with an ordinal/count description leaves the constructor invariant.

**Boundary.** The correspondence between the SEAM starting count and empirical element identity must continue to be checked against observed atomic structures. The notation alone neither proves nor falsifies the constructor.

**Sources.**
- IUPAC Gold Book, atomic number: https://goldbook.iupac.org/terms/view/A00499
- IUPAC Gold Book, atom: https://goldbook.iupac.org/terms/view/A00493
- NIST periodic table explanation: https://www.nist.gov/blogs/taking-measure/periodic-table-its-more-just-chemistry-and-physics

## A7 — FP-06 / shell closure versus formability and persistence

**Adversarial proposition.** A mathematically full shell state at Z=128 but an observed element at Z=118 shows that closure does not predict stability and therefore falsifies FP-06.

**External empirical comparator.** IUPAC/IUPAP verified the discovery of element 118 and later formally approved the name oganesson. The superheavy-element literature cited by IUPAC reports formation and decay of nuclei in this region. IUPAC also describes elements beyond the presently known set as prospective discoveries rather than established elements.

**SEAM disposition.** The current shell-capacity result explicitly states that `Z=119..128` are shell-admissible states under the fixed capacity vector, not experimentally demonstrated stable nuclei. R167 executes the distinction: Z=128 is fully shell-filled with `S_config=0`, but the specification separately places nuclear containment, isotope stability, synthesis status, and measured mass downstream of shell-admissibility. FP-06 applies to full entropy closure of the **complete admissible configuration**, not shell fill alone. Formation of Z=118 is likewise a different predicate from full closure. Terminal: `PASS_FP06_Z118_Z128_FALSIFICATION_CLOSED`.

**Boundary / falsifier.** A claim that shell-count closure alone guarantees a stable or synthesizable nucleus would be false and is not the current claim. Conversely, confirmation of an elemental state at or above the fixed shell-support ceiling `Z≥129` would falsify the present seven-shell admissibility ceiling as stated in the Technical Foundations.

**Sources.**
- IUPAC verification of elements 113, 115, 117 and 118: https://iupac.org/discovery-and-assignment-of-elements-with-atomic-numbers-113-115-117-and-118
- IUPAC approved name oganesson for element 118: https://iupac.org/iupac-announces-the-names-of-the-elements-113-115-117-and-118/
- IUPAC/PAC, synthesis and decay properties of superheavy elements: https://publications.iupac.org/pac/78/5/0889/index.html

## Combined disposition

The empirical record does not make every FP claim true by citation. It performs a narrower and necessary function: it prevents adversarial arguments from relying on empirical facts that the archive has ignored, mischaracterized, or placed at the wrong causal layer.

The seven challenges divide into three classes:

1. **Empirically tested compatibility closure:** A1 (R90 iron re-entrant topology).
2. **Category/scope errors preempted by external evidence plus explicit SEAM boundaries:** A2, A4, A6, A7.
3. **Empirical constraints explicitly admitted with a remaining stronger falsification test:** A3 (Bell quantitative correlation) and A5 (universal representational challenge).

This distinction is mandatory. A citation may corroborate or constrain a claim; it may not substitute for a native derivation that has not been executed.


## R231 canonical nuclear authority lock

Current nuclear formation authority is `(Z,N) -> Gamma_{Z,N} -> mean(Gamma) -> A_Gamma -> E_Gamma(Z) -> (N_low,N_high)`. The historical PNE/EPN `S(X) -> T -> H*` path is provenance only and is not a current dependency. R226 locks the outer formation envelope. R229 is retained solely as a falsified interior entropy-binding candidate. No current argument may infer `N_most-stable^SEAM` or `N_longest-lived^SEAM` from R229.
