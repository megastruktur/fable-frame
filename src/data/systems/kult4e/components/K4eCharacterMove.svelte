<script lang="ts">
	import type { K4ePlayerMove } from "$lib/types";
	import K4eRollResult from "./K4eRollResult.svelte";

  export let move: "avoidHarm" | "endureInjury" | "keepItTogether" | "actUnderPressure" | "engageInCombat" | "influenceOther" | "readAPerson" | "observeASituation" | "investigate" | "seeThroughTheIllusion"

  const moves: K4ePlayerMove[] = [
    // Avoid Harm
    {
      name: "avoidHarm",
      label: "Avoid Harm",
      description: "When you dodge, parry, or block Harm, roll <b>+Reflexes</b>",
      attribute: "reflexes",
      results: [
        {
          type: "success",
          description: "You emerge completely unharmed"
        },
        {
          type: "partial",
          description: "You avoid the worst of it, but:",
          choice: [
            "You end up in a bad spot",
            "You lose something",
            "You partially sustain Harm",
          ]
        },
        {
          type: "failure",
          description: "You were too slow to react or you made a bad judgment call. <b>The GM makes a Move</b>.",
          choice: [
            "You didn't avoid any Harm at all",
            "you ended up in an even worse spot than before",
          ]
        }
      ]
    },
    // Endure Injury
    {
      name: "endureInjury",
      label: "Endure Injury",
      description: "When enduring an injury, roll <b>+Fortitude -Harm</b>. If you are wearing armor, add its rating to the roll:",
      attribute: "fortitude",
      modificators: [
        "-harm",
        "+armor",
      ],
      results: [
        {
          type: "success",
          description: "You ride out the pain and keep going.",
        },
        {
          type: "partial",
          description: "You are still standing, but the GM picks one condition:",
          choice: [
            "The injury throws you off balance.",
            "You lose something",
            "You receive a <b>Serious Wound</b>.",
          ]
        },
        {
          type: "failure",
          description: "The injury is overwhelming. <b>You choose</b> if you:",
          choice: [
            "Are knocked out (the GM may also choose to inflict a <b>Serious Wound</b>).",
            "Receive a <b>Critical Wound</b>, but may continue to act (if you already have a <b>Critical Wound</b>, you may not choose this option again).",
            "Die"
          ]
        }
      ]
    },
    // Keep It Together
    {
      name: "keepItTogether",
      label: "Keep it Together",
      description: "When you exercise self-control to keep from succumbing to stress, traumatic experiences, psychic influence, or supernatural forces, roll <b>+Willpower</b>:",
      attribute: "willpower",
      results: [
        {
          type: "success",
          description: "You grit your teeth and stay the course.",
        },
        {
          type: "partial",
          description: "The effort to resist instills a condition, which remains with you until you have had time to recuperate. You <b>get -1</b> in situations where this condition would be a hindrance to you. Choose one:",
          choice: [
            "You become angry (<b>-1 Stability</b>)",
            "You become sad (<b>-1 Stability</b>)",
            "You become scared (<b>-1 Stability</b>)",
            "You become guilt-ridden (<b>-1 Stability</b>)",
            "You become obsessed (<b>+1 Relation</b> to whatever caused the condition).",
            "You become distracted (<b>-2 in situations where the condition limits you</b>).",
            "You will be haunted by the experience at a later time."
          ]
        },
        {
          type: "failure",
          description: "The strain is too much for your mind to handle. <b>The GM chooses</b> your reaction:",
          choice: [
            "Cower powerless in the threat's presence",
            "Panic with no control of your actions",
            "Suffer emotional trauma (<b>-2 Stability</b>)",
            "suffer life-changing trauma (<b>-4 Stability</b>)"
          ]
        }
      ]
    },
    // Act Under Pressure
    {
      name: "actUnderPressure",
      label: "Act Under Pressure",
      description: "When you do something risky, under time pressure, or try to avoid danger, the GM will explain what the consequence for failure is and you roll <b>+Coolness</b>:",
      attribute: "coolness",
      results: [
        {
          type: "success",
          description: "You do what you intended.",
        },
        {
          type: "partial",
          description: "You do it, but hesitate, are delayed, or must deal with a complication:",
          choice: [
            "The GM reveals an unexpected outcome, a high price, or a difficult choice.",
          ]
        },
        {
          type: "failure",
          description: "There are serious consequences. The <b>GM makes a Move</b>.",
          choice: [
            "You make a mistake",
            "You're exposed to the danger",
          ]
        }
      ]
    },
    // Engage in Combat
    {
      name: "engageInCombat",
      label: "Engage in Combat",
      description: "When you engage an able opponent in combat, explain how and roll <b>+Violence</b>:",
      attribute: "violence",
      results: [
        {
          type: "success",
          description: "You inflict damage (<i>see your weapon details</i>) to your opponent and avoid counterattacks",
        },
        {
          type: "partial",
          description: "You inflict damage (<i>see your weapon details</i>), but at a cost. <b>The GM chooses one</b>:",
          choice: [
            "You're subjected to a counterattack.",
            "You do less damage than intended.",
            "You lose something important.",
            "You expend all your ammo.",
            "You're beset by a new threat",
            "You'll be in trouble later on.",
          ]
        },
        {
          type: "failure",
          description: "Your attack doesn't go as anticipated. <b>The GM makes a Move</b>.",
          choice: [
            "You might be subjected to bad luck",
            "You miss your target",
            "You pay a high price for your assault",
          ]
        }
      ]
    },
    // Influence Other
    {
      name: "influenceOther",
      label: "Influence Other",
      description: "When you influence an NPC through negotiation, argument, or from a position of power, roll <b>+Charisma</b>:",
      attribute: "charisma",
      results: [
        {
          type: "success",
          description: "She does what you ask",
        },
        {
          type: "partial",
          description: "She does what you ask, but <b>the GM chooses one</b>:",
          choice: [
            "She demands better compensation.",
            "Complications will arise at a future time.",
            "She gives in for the moment, but will change her mind and regret it later."
          ]
        },
        {
          type: "failure",
          description: "Your attempt has unintended repercussions. <b>The GM makes a Move</b>.",
        }
      ]
    },
    // Read a Person
    {
      name: "readAPerson",
      label: "Read a Person",
      description: "When you read a person, roll +Intuition. On a success, you an <b>ask the GM/player questions about their character any time during this scene, while in conversation with their character</b>:",
      attribute: "intuition",
      results: [
        {
          type: "success",
          description: "You may ask <b>two questions</b>.",
        },
        {
          type: "partial",
          description: "You may ask <b>one question</b>.",
        },
        {
          type: "failure",
          description: "You accidentally reveal your own intentions to the person you're trying to read. <b>Tell the GM/player</b> what these intentions are. <b>The GM makes a Move</b>.",
        }
      ]
    },
    // Observe a Situation
    {
      name: "observeASituation",
      label: "Observe a Situation",
      description: "When you observe a situation, roll <b>+Perception</b>. On a success you may ask the GM questions about the current situation. <b>When you act on these answers, gain +1 to your rolls</b>:",
      attribute: "perception",
      results: [
        {
          type: "success",
          description: "Ask <b>two questions</b>.",
        },
        {
          type: "partial",
          description: "Ask <b>one question</b>.",
        },
        {
          type: "failure",
          description: "You get to <b>ask one question</b> anyway, but you get <b>no bonus for it</b>. <b>The GM makes a Move</b>.",
          choice: [
            "You miss something.",
            "You attract unwanted attention.",
            "You expose yourself to danger.",
          ]
        }
      ]
    },
    // Investigate
    {
      name: "investigate",
      label: "Investigate",
      description: "When you investigate something, roll <b>+Reason</b>. On a success, you uncover all direct leads and may ask questions to get additional information:",
      attribute: "perception",
      results: [
        {
          type: "success",
          description: "You may ask <b>two questions</b>.",
        },
        {
          type: "partial",
          description: "You may ask <b>one question</b>. The information comes at a cost. Will you do what it takes?",
          choice: [
            "You require someone or something for the answer.",
            "You expose yourself to danger.",
            "You need to expend extra time or resources.",
          ]
        },
        {
          type: "failure",
          description: "You may <b>get some information</b> anyway, but you pay a price for it. <b>The GM makes a Move</b>.",
          choice: [
            "You expose yourself to danger.",
            "You need to expend extra time or resources.",
          ]
        }
      ]
    },
    // See Through the Illusion
    {
      name: "seeThroughTheIllusion",
      label: "See Through the Illusion",
      description: "When you suffer shock, injuries, or distort your perception through drugs or rituals, roll <b>+Soul</b> to See Through the Illusion:",
      attribute: "perception",
      results: [
        {
          type: "success",
          description: "You perceive things as they truly are",
        },
        {
          type: "partial",
          description: "You see Reality, but you also affect the Illusion. <b>The GM chooses one</b>:",
          choice: [
            "Something senses you.",
            "The Illusions tears around you.",
          ]
        },
        {
          type: "failure",
          description: "The GM explains what you see and <b>makes a Move</b>.",
        }
      ]
    },
  ]

  let playerMove: K4ePlayerMove | undefined = moves.find(m => m.name === move)

</script>

<div class="card p-4 w-96">

  {#if playerMove !== undefined}

    <h2 class="h2">{playerMove.label}</h2>
    <div class="blockquote">{@html playerMove.description}</div>

    {#if playerMove.results !== undefined}
      {#each playerMove.results as rollResult(rollResult.type)}
        <K4eRollResult {rollResult} />
        {#if rollResult.type !== "failure"}
          <hr />
        {/if}
      {/each}
    {/if}

  {/if}
  
</div>
