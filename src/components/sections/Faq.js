import React from 'react';

import { Section, Container } from '@components/global';

import FaqItem from '@common/FaqItem';
import ExternalLink from '@common/ExternalLink';

const FAQS = [
  {
    title: 'Boiler & Its Types',
    content: () => (
      <>
       There are mainly two types of boiler
<br/>1. Water Tube Boiler
<br/>2. Fire Tube Boiler

<br/><br/>Water Tube Boiler:- A steam boiler in which water to be heated
circulates in tubes exposed to fire and enveloped by hot gases.
<br/><br/>Fire Tube Boiler:- In fire tube boiler, there are numbers of tubes
through which hot gases are passed and water surrounds these tubes.
<br/><br/>Main Components of Combustion boiler:-
Burner, Combustion chamber, heat exchanger, Supply lines and
Return line, Circulatory pumps 
      </>
    ),
  },
  {
    title: 'BoilerScales',
    content: () => (
      <>
       Scales are formed out of salts. Those salts come inside the boiler
through water in form of soluble solids and are precipitated when the
concentration level increases because of evaporation. <br/><br/>Scales are
basically crystalline and more difficult to remove.
Scales are maily made up of calcium carbonate (CaCO3), Calcium
sulphate (CaSO4), Barium Sulphate (BaSO4), Calcium Fluoride
(CaF2), Calcium Phosphate [Ca3(PO4)2].
      </>
    ),
  },
  {
    title: 'Disadvantages of BoilerScales ',
    content: () => (
      <>
       1. Wastage of fuel :- Scales have a thermal conductivity so the rate of
heat transfer from boiler to inside water is greatly reduced. In order to
provide a steady supply of heat to water, excessive or overheating is
done and this causes increase in fuel consumption.
<br/><br/>2. Decrease in Efficiency of Boiler :- The excessive scale formation
may cause clogging of Boiler tubes which decreases the efficiency of
boiler .
<br/><br/>3. Danger of Explosion :- The scale formation also leads to the uneven
expansion of the boiler metal. Due to this thick scales crack and water
comes suddenly in contact with overheated iron plates. This results in
the formation of a large amount of steel suddenly which turn into high
pressure. The sudden high pressure thus developed may lead to
explosion of boiler.
<br/><br/>4. Corrosion:- There are certain salts formed from scale, corrodes the
tubes, thus there is steal greater corrosion of the boiler tubes.
<br/><br/>5. Boiler Becomes Unsafe :- Overheating of boilers occurs due to
scale formation and metal become soft and weak. This makes the us of
Boiler unsafe, particularly at high pressure
      </>
    ),
  },
  {
    title: 'Removal of Scales & Sludges',
    content: () => (
      <>
      Scales can be removed with the help of Antiscalant
Chemical, Blow down Operations, EDTASolution.
<br/><br/>1. Antiscalant Chemicals :- Antiscalants are a
family of chemicals like Antiscalant, oxygen
scavenger, pH Booster designed to inhibit the
formation and precipitation of crystalized mineral
salts that form scale.
Antiscalant compound is adianionic
polyelectrolyte(DAPE), or more particularly
poly[disodium3-( N,N-diallylamino)propanephosphonate]
<br/><br/>2. Oxygen Scavenger :- Oxygen scavengers are
used to remove dissolved oxygen from the boiler
feed water and boilers. Dissolved oxygen in the
boiler is very corrosive at high temp. and pressure.
This may lead to localized patting and premature
boiler tube failure or excessive feed water leaks.
<br/><br/>3. pH Booster :- pH Booster is a rigorous blend of
alkalinity blunder, softening agent and synthetic
organic sludge conditioner. It counteracts the fall in
pH in the permeate water due to removal of salts. It is
highly compatible for portable applications.
Water Solubility : Completely Soluble
Appearance : Clear Liquid
<br/><br/>4. Fireside :- Dynamic chemical provides a series of
fuel additives and fireside chemicals for liquid and
solid fuel fired boilers where the impact of clinker
formation can result in frequent cleaning, increased
downtime and increase in specific fuel consumption
      </>
    ),
  },
  {
    title: 'RO(Reverse Osmosis)',
    content: () => (
      <>
      Reverse Osmosis ( RO) :- Reverse Osmosis is widely used in the
residential and commercial water filteration system, used to remove
hardness of water and make it suitable for used in feed water tanks in
industries.
<br/>RO is now being used in various applications including selective
separation, purification and concentration process.
<br/><br/>RO Scales:- Common foulants and scalants include calcium carbonate,
calcium sulphate, barium sulphate, strontium sulphate and other
organic contaminants.
<br/><br/>RO Antiscalants :- Antiscalant is a pretreatment water additive for
reverse osmosis that is highly effective in preventing the membranes
from scaling. The delay allows the water to pass through the membrane
before any chemical reaction, in which scale can form, occurs.
<br/><br/>pH Booster :- Dynamic’s pH Booster for RO is rigorous blend of
alkalinity builder, softening agent and synthetic organic sludge
container. It counteracts the fall in pH in the permeate water due to
removal of salts. It is highly compatible and ready to use composition
for potable applications. 
      </>
    ),
  },
  {
    title: 'Cooling Tower',
    content: () => (
      <>
    Cooling Tower :- ACooling tower is a specialized heat exchange
in which air and water are brught into direct contact with each
other. i.e, cooling towers are essentially large boxes designed to
maximize evaporation of water.
<br/><br/>Cooling TowerAntiscalant:- Organic dispersants These cooling
tower water treatment can be used to prevent fouling and th
accumulation of biofilms. Dynamic chemical’s Antiscalant can
be used as a disinfectant to display microorganisms and prevent
recurring growth.
<br/><br/>Biocides:- Biocides are used to control bacteria in cooling tower
system. Under deposit corrosion occurs when bacteria occuring
within the water system. Under this bacteria corrosion occurs.
The microorganisms killed by Biocides are through
electrochemical process of oxidation with the help of oxidising
agents.
<br/><br/>Anticorrosion Chemicals:- Corrosion control can be done with
the use of Corrosion inhibitors and by removal of corrosive
oxygen from the water by chemical reaction. i.e,
<br/>1. Passivating (anodic) inhibitors.
<br/>2. Precipitating (Cathodic) inhibitors
      </>
    ),
  },
  {
    title: 'Descaling Process',
    content: () => (
      <>
    Descaling : Descaling is the process of removing scale from equipment such as
boilers and heat exchangers. It involves the removal of thick layers of oxides
formed on metals at elevated temperatures. Descaling safely and effectively
removes Limescale; a hard, off-white, chalky deposit that can impair the
operation of various components.
<br/><br/>PHILOSOPHYOFTREATMENT
<br/>Dynamic chemicals has been manufacturing safe chemical solutions for years, so
we are familiar with all shapes, sizes and boiler configurations. The procedure
outline below is brief and simple for most boiler cleanings.
<br/>1. Shut down boiler.
<br/>2. Blow down with pressure still on.
<br/>3. Drain and flush unit.
<br/>4. Close steam valve.
<br/>5. Add DYNAMIC CHEMICALS SOLUTION, and then top off with water.
<br/>6. Circulate through the drain or low point and return from the pressure relief
valve or high point of the boiler to a vented container.
<br/>7. Circulate for 14-18 hours depending on volume.
<br/>8. Open steam valve.
<br/>9. Drain, flush, re-fill and start up.
<br/>Descaling is the process of removing scale from equipment such as
Descaling Process
<br/><br/>DESCALING CHEMICALS
<br/>Conditioning Chemical
<br/>D-Anti Scalent Chemical
<br/>Neutralizer Chemical


      </>
    ),
  },
];

const Faq = () => (
  <Section id="faq">
    <Container>
    <h2 style={{textAlign:'center',fontWeight:'800'}}>FREQUENTLY ASKED QUESTIONS</h2>
      <div>
        {FAQS.map(({ title, content }) => (
          <FaqItem title={title} key={title}>
            {content()}
          </FaqItem>
        ))}
      </div>
    </Container>
  </Section>
);

export default Faq;
