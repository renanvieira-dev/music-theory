// data/modules.ts
import { Module } from '@/types/course';

export const COURSE_MODULES: Module[] = [
  {
    id: 'mod-1',
    number: 1,
    level: 'iniciante',
    slug: 'intervalos-no-braco',
    title: 'Módulo 1: Intervalos & Geometria do Braço',
    description: 'Compreende a distância entre as notas e domina os shapes universais de terça, quinta, oitava e inversões nas cordas.',
    lessons: [
      {
        id: 'les-1-1',
        slug: 'introducao-aos-intervalos',
        title: 'O que são Intervalos e a Geometria das Cordas',
        subtitle: 'A menor distância (semitom) e a base de formação harmónica no braço.',
        readingTime: '5 min de estudo + prática',
        conceptSummary: [
          'Intervalo é a distância física e acústica entre duas notas.',
          '1 Semitom = 1 casa no braço do instrumento.',
          '1 Tom = 2 casas no braço.',
          'Na afinação padrão (E-A-D-G-B-E), os desenhos mantêm um padrão fixo em quase todas as cordas, exceto na transição da 3ª (Sol) para a 2ª corda (Si).'
        ],
        theoryContent: [
          {
            heading: 'Classificação Básica: Simples vs Compostos',
            body: 'Intervalos simples são aqueles contidos dentro de uma oitava (até à 8ª justa). Quando o intervalo ultrapassa a oitava (como a 9ª, 11ª ou 13ª), é chamado de composto. No violão e na guitarra, dominar os intervalos simples na mesma região do braço liberta a montagem imediata de acordes sem decoreba.'
          },
          {
            heading: 'A Terça: A nota que define o modo (Maior ou Menor)',
            body: 'A Terça Maior (3M) tem distância de 2 tons (4 casas). A Terça Menor (3m) tem distância de 1 tom e meio (3 casas). No braço, não precisas de contar casa a casa se memorizares o formato geométrico vertical.'
          }
        ],
        guitarApplication: {
          rule: 'A partir de qualquer nota na 5ª corda (Lá) ou 6ª corda (Mi), a Terça Maior fica exatamente UMA corda abaixo e UMA casa atrás. A Terça Menor fica UMA corda abaixo e DUAS casas atrás.',
          shapes: [
            {
              title: 'Terça Maior (3M) partindo de Dó (C)',
              description: 'Dó na 5ª corda (casa 3) com a Terça Maior Mi na 4ª corda (casa 2). Distância de 2 tons.',
              startFret: 1,
              endFret: 5,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '3M' }
              ]
            },
            {
              title: 'Terça Menor (3m) partindo de Dó (C)',
              description: 'Dó na 5ª corda (casa 3) com a Terça Menor Mib na 4ª corda (casa 1). Distância de 1 tom e meio.',
              startFret: 1,
              endFret: 5,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 1, note: 'Eb', interval: '3m' }
              ]
            },
            {
              title: 'Quinta Justa (5J) e Oitava (8J) - Estrutura de Power Chord',
              description: 'Dó (5ª corda, c.3) -> Sol (4ª corda, c.5) -> Dó Oitava (3ª corda, c.5).',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 5, note: 'C', interval: '8J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q1',
            question: 'Se a fundamental está na 5ª corda, casa 5 (nota Ré), onde fica a sua Terça Maior (Fá#)?',
            options: [
              'Na 4ª corda, casa 4',
              'Na 4ª corda, casa 3',
              'Na 6ª corda, casa 5',
              'Na 4ª corda, casa 5'
            ],
            correctAnswer: 0,
            explanation: 'Correto! O formato vertical dita que a Terça Maior fica uma corda abaixo e uma casa atrás (5 - 1 = 4).'
          },
          {
            id: 'q2',
            question: 'Qual é a distância exata em tons de uma Terça Menor (3m)?',
            options: [
              '2 tons',
              '1 tom e meio (1 tom + 1 semitom)',
              '1 tom',
              '3 tons'
            ],
            correctAnswer: 1,
            explanation: 'Uma terça menor possui sempre 1 tom e meio (exemplo: de Dó para Mi bemol).'
          }
        ]
      },
      {
        id: 'les-1-2',
        slug: 'inversao-de-intervalos-e-regra-do-9',
        title: 'Inversão de Intervalos & A Regra do 9',
        subtitle: 'Transformação qualitativa e quantitativa dos intervalos no braço.',
        readingTime: '6 min de estudo + prática',
        conceptSummary: [
          'Inverter um intervalo consiste em elevar a nota mais grave uma oitava ou descer a mais aguda uma oitava.',
          'Regra do 9: A soma do intervalo original com a sua inversão resulta sempre em 9 (ex: 3ª transforma-se em 6ª, 2ª transforma-se em 7ª).',
          'Qualidades espelhadas: Maior vira Menor, Aumentado vira Diminuto e Justo permanece Justo.',
          'No braço, inverter intervalos permite encontrar notas de resolução em posições compactas sem deslocamentos desnecessários.'
        ],
        theoryContent: [
          {
            heading: 'A Regra Quantitativa e Qualitativa',
            body: 'Ao invertermos uma 3ª Maior (como Dó para Mi), obtemos uma 6ª Menor (Mi para Dó). A regra matemática é simples: 9 - 3 = 6. E a classificação qualitativa inverte-se: Maior passa a Menor. Isso explica por que vários shapes de acordes partilham estruturas espelhadas nas cordas.'
          },
          {
            heading: 'Quadro de Transformação Rápida',
            body: '2ª Maior <-> 7ª Menor | 3ª Maior <-> 6ª Menor | 4ª Justa <-> 5ª Justa | 4ª Aumentada (Trítono) <-> 5ª Diminuta.'
          }
        ],
        guitarApplication: {
          rule: 'Ao tocar uma Terça Maior vertical (C na corda 5, E na corda 4), se colocares a nota Mi no baixo na corda 6 (casa 0 solta) com o Dó na corda 5 (casa 3), obténs a 6ª Menor imediatamente formada.',
          shapes: [
            {
              title: 'Intervalo Original: Terça Maior (3M)',
              description: 'Dó (5ª corda, casa 3) para Mi (4ª corda, casa 2).',
              startFret: 1,
              endFret: 5,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '3M' }
              ]
            },
            {
              title: 'Intervalo Invertido: Sexta Menor (6m)',
              description: 'Mi no baixo (6ª corda solta, casa 0) para Dó (5ª corda, casa 3). A soma dá 9 e o Maior virou Menor.',
              startFret: 0,
              endFret: 4,
              markers: [
                { string: 6, fret: 0, note: 'E', interval: 'F', isRoot: true },
                { string: 5, fret: 3, note: 'C', interval: '6m' }
              ]
            },
            {
              title: 'Inversão do Trítono: 4ª Aumentada <-> 5ª Diminuta',
              description: 'Fá (corda 6, casa 1) e Si (corda 5, casa 2) = 4ª Aum. Na inversão, Si para Fá forma a 5ª Diminuta.',
              startFret: 1,
              endFret: 4,
              markers: [
                { string: 6, fret: 1, note: 'F', interval: 'F', isRoot: true },
                { string: 5, fret: 2, note: 'B', interval: '4aum' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-inv-1',
            question: 'Segundo a Regra do 9, qual é o intervalo resultante da inversão de uma 3ª Menor (3m)?',
            options: [
              '6ª Maior (6M)',
              '6ª Menor (6m)',
              '7ª Menor (7m)',
              '5ª Justa (5J)'
            ],
            correctAnswer: 0,
            explanation: 'Correto! 9 - 3 = 6, e o intervalo Menor converte-se sempre em Maior na inversão.'
          },
          {
            id: 'q-inv-2',
            question: 'Se invertermos uma 4ª Justa (4J), qual é o intervalo obtido?',
            options: [
              '4ª Diminuta',
              '5ª Justa (5J)',
              '5ª Aumentada',
              '6ª Menor'
            ],
            correctAnswer: 1,
            explanation: 'Correto! 9 - 4 = 5, e intervalos Justos permanecem sempre Justos após a inversão.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    level: 'iniciante',
    slug: 'escalas-e-ciclos',
    title: 'Módulo 2: Escala Maior, Menor Natural & Ciclos',
    description: 'A fórmula das escalas diatónicas, a diferença entre graus tonais e modais, e a geometria das relativas menores no braço.',
    lessons: [
      {
        id: 'les-2-1',
        slug: 'escala-maior-no-braco',
        title: 'A Escala Maior e o Bloco de Digitação',
        subtitle: 'A fórmula Tom-Tom-Semitom-Tom-Tom-Tom-Semitom convertida em digitação de 1 oitava.',
        readingTime: '7 min de estudo + prática',
        conceptSummary: [
          'A Escala Maior segue o padrão rigoroso: T - T - ST - T - T - T - ST.',
          'Graus Tonais: I, IV e V (conservam estabilidade tonal justa).',
          'Graus Modais: III, VI e VII (definem se a escala soa maior ou menor).',
          'No braço do instrumento, 1 Tom = saltar 1 traste (2 casas); 1 Semitom = casa imediatamente seguinte.'
        ],
        theoryContent: [
          {
            heading: 'Fórmula Estrutural e Graus',
            body: 'A escala diatónica maior é a régua padrão da harmonia ocidental. A partir da tónica, construímos: I (Tónica), II (Supertónica - 1 Tom), III (Mediante - 1 Tom), IV (Subdominante - 1/2 Tom), V (Dominante - 1 Tom), VI (Superdominante - 1 Tom) e VII (Sensível - 1 Tom). Entre o VII grau e a oitava temos apenas meio tom.'
          },
          {
            heading: 'A Sensível (VII Grau)',
            body: 'Por estar a apenas meio tom da oitava, a Sensível tem uma atração melódica quase magnética em direção à tónica. No braço do violão/guitarra, este semitom final é tocado na casa encostada à nota de resolução.'
          }
        ],
        guitarApplication: {
          rule: 'Padrão compacto de 1 oitava partindo da 5ª corda (Dó na casa 3): Corda 5 (Dó c.3, Ré c.5) -> Corda 4 (Mi c.2, Fá c.3, Sol c.5) -> Corda 3 (Lá c.2, Si c.4, Dó c.5).',
          shapes: [
            {
              title: 'Escala de Dó Maior (1 Oitava completa)',
              description: 'Digitação vertical limpa em 3 cordas adjacentes (5ª, 4ª e 3ª cordas). Ouve a resolução Si -> Dó.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 5, fret: 5, note: 'D', interval: '2M' },
                { string: 4, fret: 2, note: 'E', interval: '3M' },
                { string: 4, fret: 3, note: 'F', interval: '4J' },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 2, note: 'A', interval: '6M' },
                { string: 3, fret: 4, note: 'B', interval: '7M' },
                { string: 3, fret: 5, note: 'C', interval: '8J', isRoot: true }
              ]
            },
            {
              title: 'Tríade Tonal Dentro da Escala (I - IV - V)',
              description: 'Os três pilares da tonalidade: Dó (I), Fá (IV) e Sol (V). Ouve a cadência primária.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: '4J' },
                { string: 4, fret: 5, note: 'G', interval: '5J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-em-1',
            question: 'Qual é a sequência exata de intervalos da Escala Maior?',
            options: [
              'T - T - ST - T - T - T - ST',
              'T - ST - T - T - ST - T - T',
              'T - T - T - ST - T - T - ST',
              'T - ST - T - T - T - ST - T'
            ],
            correctAnswer: 0,
            explanation: 'Exato! A Escala Maior possui semitons apenas entre os graus III-IV e VII-VIII.'
          },
          {
            id: 'q-em-2',
            question: 'Quais são considerados os Graus Tonais de uma escala?',
            options: [
              'I, III e V',
              'I, IV e V',
              'III, VI e VII',
              'II, IV e VI'
            ],
            correctAnswer: 1,
            explanation: 'Correto! Os graus I, IV e V são graus tonais (justos) e definem a estabilidade da tonalidade.'
          }
        ]
      },
      {
        id: 'les-2-2',
        slug: 'escala-menor-e-relativas',
        title: 'Escala Menor Natural & A Regra das Relativas',
        subtitle: 'A alteração dos graus modais (b3, b6, b7) e o atalho visual das relativas menores.',
        readingTime: '6 min de estudo + prática',
        conceptSummary: [
          'A Escala Menor Natural altera os 3 graus modais em relação à maior: b3, b6 e b7.',
          'Fórmula Menor: T - ST - T - T - ST - T - T.',
          'Escalas Relativas partilham exatamente a mesma armadura e as mesmas notas.',
          'No braço da guitarra: A relativa menor de qualquer tom maior fica sempre 3 trastes (1 tom e meio) atrás na mesma corda.'
        ],
        theoryContent: [
          {
            heading: 'Graus Modais: A mutação Maior -> Menor',
            body: 'Para transformar Dó Maior em Dó Menor, os graus tonais (I, IV, V) mantêm-se intactos. Apenas os graus modais recuam meio tom: a 3ª vira Mib (3m), a 6ª vira Láb (6m) e a 7ª vira Sib (7m).'
          },
          {
            heading: 'O Atalho Prático das Escalas Relativas',
            body: 'O VI grau de qualquer escala maior é a tónica da sua relativa menor (ex: em Dó Maior, o 6º grau é Lá -> Lá Menor é a sua relativa). Como ambas usam as mesmas notas, se souberes o desenho da escala maior, já sabes a escala menor correspondente.'
          }
        ],
        guitarApplication: {
          rule: 'Regra dos 3 Trastes: Se o teu tom maior tem a tónica na casa 8 (Dó na 6ª corda), recua 3 casas até à casa 5 (Lá). A partir dessa casa 5 tens a Escala Relativa de Lá Menor.',
          shapes: [
            {
              title: 'Escala de Dó Menor Natural (1 Oitava)',
              description: 'Nota a diferença sombria gerada pelos graus modais bemolizados: Eb (3m), Ab (6m) e Bb (7m).',
              startFret: 1,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 5, fret: 5, note: 'D', interval: '2M' },
                { string: 4, fret: 1, note: 'Eb', interval: '3m' },
                { string: 4, fret: 3, note: 'F', interval: '4J' },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 1, note: 'Ab', interval: '6m' },
                { string: 3, fret: 3, note: 'Bb', interval: '7m' },
                { string: 3, fret: 5, note: 'C', interval: '8J', isRoot: true }
              ]
            },
            {
              title: 'Visualização Relativa: Dó Maior <-> Lá Menor na 6ª corda',
              description: 'Casa 8 (Dó - Maior) e Casa 5 (Lá - Menor Relativa). Mesmas notas, centros de repouso diferentes.',
              startFret: 4,
              endFret: 9,
              markers: [
                { string: 6, fret: 5, note: 'A', interval: '6M', isRoot: true },
                { string: 6, fret: 8, note: 'C', interval: 'F', isRoot: true }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-rel-1',
            question: 'Qual é a escala relativa menor de Dó Maior?',
            options: [
              'Ré Menor (Dm)',
              'Mi Menor (Em)',
              'Lá Menor (Am)',
              'Sol Menor (Gm)'
            ],
            correctAnswer: 2,
            explanation: 'Correto! O 6º grau de Dó Maior é a nota Lá, portanto a relativa menor é Lá Menor.'
          },
          {
            id: 'q-rel-2',
            question: 'Quais são os graus responsáveis por determinar o modo (Maior ou Menor)?',
            options: [
              'I, IV e V',
              'III, VI e VII',
              'II, IV e VI',
              'I, II e III'
            ],
            correctAnswer: 1,
            explanation: 'Exato! III, VI e VII são os Graus Modais que diferenciam a escala maior da menor.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    level: 'iniciante',
    slug: 'triades-e-inversoes',
    title: 'Módulo 3: Formação de Tríades & Inversões Práticas',
    description: 'A anatomia das 4 tríades (Maior, Menor, Aumentada e Diminuta) e o mapeamento de inversões nas cordas agudas do instrumento.',
    lessons: [
      {
        id: 'les-3-1',
        slug: 'as-quatro-triades-essenciais',
        title: 'As 4 Tríades Essenciais no Braço',
        subtitle: 'Empilhamento de terças: Maior (3+b3), Menor (b3+3), Aumentada (3+3) e Diminuta (b3+b3).',
        readingTime: '8 min de estudo + prática',
        conceptSummary: [
          'Tríade é um acorde formado por 3 notas sobrepostas em intervalos de terça.',
          'Tríade Maior: F - 3M - 5J (estrutura: 3M + 3m).',
          'Tríade Menor: F - 3m - 5J (estrutura: 3m + 3M).',
          'Tríade Aumentada: F - 3M - #5 (estrutura: 3M + 3M).',
          'Tríade Diminuta: F - 3m - b5 (estrutura: 3m + 3m).'
        ],
        theoryContent: [
          {
            heading: 'A Base Harmónica Universal',
            body: 'Qualquer harmonia complexa nasce da tríade. A Fundamental dá o nome ao acorde. A Terça define a sua natureza (alegre/maior vs introspectiva/menor). A Quinta define a sua estabilidade: se for Justa, o acorde soa firme; se for Diminuta ou Aumentada, cria tensão que pede resolução imediata.'
          },
          {
            heading: 'Comparação de Fórmulas em Dó (C)',
            body: 'C Maior: C - E - G. Cm: C - Eb - G. C(#5): C - E - G#. C°: C - Eb - Gb. Repara que apenas alterando 1 semitom na 3ª ou na 5ª, mudas toda a identidade do acorde.'
          }
        ],
        guitarApplication: {
          rule: 'Nas cordas 3, 2 e 1 (Sol, Si e Mi agudo), as 4 tríades formam formatos triangulares compactos fáceis de visualizar e arpejar.',
          shapes: [
            {
              title: 'Tríade de Dó Maior (C) - Cordas 3, 2 e 1',
              description: 'Sol (corda 3, casa 5) -> Dó (corda 2, casa 5) -> Mi (corda 1, casa 3). Fórmula F - 3M - 5J.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 3, fret: 5, note: 'G', interval: '5J' },
                { string: 2, fret: 5, note: 'C', interval: 'F', isRoot: true },
                { string: 1, fret: 3, note: 'E', interval: '3M' }
              ]
            },
            {
              title: 'Tríade de Dó Menor (Cm) - Cordas 3, 2 e 1',
              description: 'A 3ª recua 1 casa: Mi vira Mib (corda 1, casa 3 recua para casa 3 ou Mi bemol na corda 1). Notas C - Eb - G.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 3, fret: 5, note: 'G', interval: '5J' },
                { string: 2, fret: 4, note: 'Eb', interval: '3m' },
                { string: 1, fret: 3, note: 'C', interval: 'F', isRoot: true }
              ]
            },
            {
              title: 'Tríade Diminuta de Dó (C°) - Cordas 3, 2 e 1',
              description: 'Terça Menor (Eb) e Quinta Diminuta (Gb). Notas: C - Eb - Gb. Tensão tensa e instável.',
              startFret: 1,
              endFret: 5,
              markers: [
                { string: 3, fret: 5, note: 'C', interval: 'F', isRoot: true },
                { string: 2, fret: 4, note: 'Eb', interval: '3m' },
                { string: 1, fret: 2, note: 'Gb', interval: 'b5' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-tri-1',
            question: 'Qual é a estrutura de intervalos que compõe uma Tríade Aumentada?',
            options: [
              'Terça Maior + Terça Menor (3 + b3)',
              'Terça Menor + Terça Maior (b3 + 3)',
              'Terça Maior + Terça Maior (3 + 3)',
              'Terça Menor + Terça Menor (b3 + b3)'
            ],
            correctAnswer: 2,
            explanation: 'Correto! A tríade aumentada é formada por duas terças maiores sobrepostas (F - 3M - #5).'
          },
          {
            id: 'q-tri-2',
            question: 'Quais são as notas que formam a tríade de Dó Menor (Cm)?',
            options: [
              'C - E - G',
              'C - Eb - G',
              'C - Eb - Gb',
              'C - E - G#'
            ],
            correctAnswer: 1,
            explanation: 'Exato! Cm é formado pela Fundamental (C), Terça Menor (Eb) e Quinta Justa (G).'
          }
        ]
      },
      {
        id: 'les-3-2',
        slug: 'inversoes-de-triades',
        title: 'Inversões de Tríades no Braço (Baixo na 3ª e na 5ª)',
        subtitle: 'Estado Fundamental, 1ª Inversão e 2ª Inversão: fluidez melódica na condução de vozes.',
        readingTime: '8 min de estudo + prática',
        conceptSummary: [
          'Inversão ocorre quando uma nota que não é a fundamental passa a soar no baixo (nota mais grave).',
          'Estado Fundamental: Baixo na Fundamental (F - 3 - 5).',
          '1ª Inversão: Baixo na Terça (3 - 5 - F), cifrado como C/E.',
          '2ª Inversão: Baixo na Quinta (5 - F - 3), cifrado como C/G.',
          'Praticar as 3 posições no mesmo conjunto de cordas elimina saltos bruscos de mão no braço.'
        ],
        theoryContent: [
          {
            heading: 'Por que inverter tríades no violão e na guitarra?',
            body: 'Quando tocas todos os acordes no estado fundamental, a mão esquerda é obrigada a saltar grandes distâncias pelo braço. Com as inversões, a nota mais próxima liga um acorde ao seguinte (condução de vozes). Além disso, o baixo ganha contorno melódico (ex: C -> G/B -> Am).'
          },
          {
            heading: 'Cifragem de Inversões',
            body: 'A barra inclinada (/) indica que a nota após a barra é o baixo executado. C/E significa: acorde de Dó maior com a nota Mi a soar no baixo mais grave.'
          }
        ],
        guitarApplication: {
          rule: 'Caminho melódico de Dó Maior no conjunto de cordas 1, 2 e 3: Estado Fundamental (E-G-C), 1ª Inversão (G-C-E) e 2ª Inversão (C-E-G).',
          shapes: [
            {
              title: 'C/E (1ª Inversão - Baixo na 3ª Mi)',
              description: 'Baixo na 3ª corda (Mi c.9) -> Sol (corda 2, c.8) -> Dó (corda 1, c.8). Estrutura 3M - 5J - F.',
              startFret: 7,
              endFret: 11,
              markers: [
                { string: 3, fret: 9, note: 'E', interval: '3M', isRoot: false },
                { string: 2, fret: 8, note: 'G', interval: '5J' },
                { string: 1, fret: 8, note: 'C', interval: 'F', isRoot: true }
              ]
            },
            {
              title: 'C/G (2ª Inversão - Baixo na 5ª Sol)',
              description: 'Baixo na 4ª corda (Sol c.5) -> Dó (corda 3, c.5) -> Mi (corda 2, c.5). Estrutura 5J - F - 3M.',
              startFret: 4,
              endFret: 7,
              markers: [
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 5, note: 'C', interval: 'F', isRoot: true },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-invtri-1',
            question: 'Quando um acorde de Dó Maior tem o seu baixo na nota Mi, temos qual inversão?',
            options: [
              'Estado Fundamental',
              '1ª Inversão (C/E)',
              '2ª Inversão (C/G)',
              '3ª Inversão'
            ],
            correctAnswer: 1,
            explanation: 'Correto! A 1ª Inversão ocorre sempre que o baixo está na terça do acorde (3 - 5 - F).'
          },
          {
            id: 'q-invtri-2',
            question: 'Quantas possibilidades de inversão possui uma tríade?',
            options: [
              'Apenas 1 inversão',
              '2 inversões (baixo na 3ª ou baixo na 5ª)',
              '3 inversões',
              '4 inversões'
            ],
            correctAnswer: 1,
            explanation: 'Exato! As tríades possuem duas inversões possíveis: baixo na terça (1ª) e baixo na quinta (2ª).'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    level: 'iniciante',
    slug: 'tetrades-e-voicings',
    title: 'Módulo 4: Tétrades, Voicings & As 3 Inversões',
    description: 'Os acordes de 4 sons (7M, 7, m7, m7b5), o conceito de voicings abertos e as 3 possibilidades de inversão no braço.',
    lessons: [
      {
        id: 'les-4-1',
        slug: 'as-quatro-familias-de-tetrades',
        title: 'As 4 Famílias de Tétrades no Braço',
        subtitle: 'A adição da 7ª e a formação dos 4 acordes fundamentais da música popular.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Tétrade é um acorde formado por 4 notas: Fundamental, Terça, Quinta e Sétima.',
          '7M (Maior com 7ª Maior): F - 3M - 5J - 7M (estrutura: 3 + b3 + 3).',
          '7 (Dominante / Maior com 7ª Menor): F - 3M - 5J - b7 (estrutura: 3 + b3 + b3).',
          'm7 (Menor com 7ª Menor): F - b3 - 5J - b7 (estrutura: b3 + 3 + b3).',
          'm7(b5) (Meio Diminuto): F - b3 - b5 - b7 (estrutura: b3 + b3 + 3).'
        ],
        theoryContent: [
          {
            heading: 'Por que estudar Tétrades?',
            body: 'As tríades dão o alicerce básico, mas são as tétrades que definem o estilo de géneros ricos como Bossa Nova, MPB, Jazz e Soul. A adição do 7º grau acrescenta cor e direcionalidade harmónica a cada acorde.'
          },
          {
            heading: 'O Acorde Dominante (X7) e o Trítono',
            body: 'O acorde Maior com Sétima Menor (X7) é o motor da harmonia funcional. Entre a sua Terça Maior e a sua Sétima Menor existe uma distância exata de 3 tons (o Trítono). Essa tensão acústica impele o acorde a resolver no I grau da escala.'
          }
        ],
        guitarApplication: {
          rule: 'Nas cordas 5, 4, 3 e 2, montamos tétrades sem pestana que mantêm a mão relaxada e definem cada grau com clareza.',
          shapes: [
            {
              title: 'C7M (Dó com 7ª Maior) - Cordas 5, 4, 3 e 2',
              description: 'Dó (corda 5, c.3) -> Mi (corda 4, c.2) -> Sol (corda 3, c.0) -> Si (corda 2, c.0) ou Si na corda 3 casa 4. Notas C-E-G-B.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 4, note: 'B', interval: '7M' },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            },
            {
              title: 'C7 (Dó Dominante) - Cordas 5, 4, 3 e 2',
              description: 'A 7ª recua 1 casa: Si (7M) passa a Sib (b7). Notas C - E - G - Bb. Tensão característica do V grau.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 3, note: 'Bb', interval: 'b7' },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            },
            {
              title: 'Cm7 (Dó Menor com 7ª) - Cordas 5, 4, 3 e 2',
              description: 'Terça Menor (Eb) e Sétima Menor (Bb). Notas C - Eb - G - Bb. O acorde do II grau menor.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 3, note: 'Bb', interval: 'b7' },
                { string: 2, fret: 4, note: 'Eb', interval: '3m' }
              ]
            },
            {
              title: 'Cm7(b5) (Dó Meio Diminuto) - Cordas 5, 4, 3 e 2',
              description: 'A 5ª recua meio tom: Sol passa a Solb. Notas C - Eb - Gb - Bb. O acorde meio diminuto do VII grau.',
              startFret: 2,
              endFret: 5,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 4, note: 'Gb', interval: 'b5' },
                { string: 3, fret: 3, note: 'Bb', interval: 'b7' },
                { string: 2, fret: 4, note: 'Eb', interval: '3m' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-tet-1',
            question: 'Qual é a diferença estrutural entre um acorde X7M e um acorde X7?',
            options: [
              'O acorde X7M tem a 5ª aumentada',
              'O acorde X7 possui a 7ª menor (b7), enquanto o X7M possui a 7ª maior (7M)',
              'O acorde X7 não tem terça',
              'O acorde X7M possui a terça menor'
            ],
            correctAnswer: 1,
            explanation: 'Correto! A única diferença entre 7M e 7 dominante é a sétima: maior (7M) no primeiro e menor (b7) no segundo.'
          },
          {
            id: 'q-tet-2',
            question: 'Quais notas compõem a tétrade meio diminuta de Dó (Cm7(b5))?',
            options: [
              'C - E - G - B',
              'C - Eb - G - Bb',
              'C - Eb - Gb - Bb',
              'C - Eb - Gb - Bbb'
            ],
            correctAnswer: 2,
            explanation: 'Exato! Cm7(b5) é formado por Fundamental (C), Terça Menor (Eb), Quinta Diminuta (Gb) e Sétima Menor (Bb).'
          }
        ]
      },
      {
        id: 'les-4-2',
        slug: 'inversoes-de-tetrades-e-voicings',
        title: 'As 3 Inversões de Tétrades & Condução Harmónica',
        subtitle: '1ª (na 3ª), 2ª (na 5ª) e a 3ª Inversão (baixo na 7ª): conduzindo baixos passo a passo.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Enquanto as tríades têm 2 inversões, as tétrades possuem 3 inversões possíveis.',
          '1ª Inversão: Baixo na Terça (3 - 5 - 7 - F), ex: C7M/E.',
          '2ª Inversão: Baixo na Quinta (5 - 7 - F - 3), ex: C7M/G.',
          '3ª Inversão: Baixo na Sétima (7 - F - 3 - 5), ex: C/B ou C7/Bb.',
          'Na 3ª inversão, a presença da nota no baixo já indica a sétima, sendo cifrada frequentemente como C/B.'
        ],
        theoryContent: [
          {
            heading: 'A 3ª Inversão e os Baixos Descendentes',
            body: 'A terceira inversão é um dos recursos mais belos da harmonia. Quando tocas C -> C/B -> Am7 -> Am/G, o baixo caminha nota a nota de forma descendente (Dó -> Si -> Lá -> Sol), criando uma linha fluida enquanto a harmonia se move com suavidade.'
          },
          {
            heading: 'Voicings Abertos vs. Fechados',
            body: 'No piano é comum tocar posições cerradas (todas as notas encostadas). No violão e na guitarra, abrimos as notas (Voicings Drop 2 e Drop 3), espalhando os graus entre graves e agudos para obter ressonância sem empastar a afinação.'
          }
        ],
        guitarApplication: {
          rule: 'A 3ª inversão de C7M (C/B) com baixo na 5ª corda casa 2 (nota Si) seguida de C7M no estado fundamental permite ouvir imediatamente a condução melódica.',
          shapes: [
            {
              title: 'C7M Estado Fundamental (Baixo em Dó)',
              description: 'Dó (corda 5, c.3) -> Sol (corda 4, c.5) -> Si (corda 3, c.4) -> Mi (corda 2, c.5). Baixo na tónica.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 4, note: 'B', interval: '7M' },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            },
            {
              title: 'C/B (3ª Inversão - Baixo na 7ª Maior Si)',
              description: 'O baixo recua 1 casa para o Si (corda 5, c.2) mantendo as notas do acorde C7M. Fórmula 7M - 5J - F - 3M.',
              startFret: 1,
              endFret: 6,
              markers: [
                { string: 5, fret: 2, note: 'B', interval: '7M', isRoot: false },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 5, note: 'C', interval: 'F', isRoot: true },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            },
            {
              title: 'C7M/E (1ª Inversão - Baixo na 3ª Mi)',
              description: 'Mi no baixo na 6ª corda solta (ou casa 0) ou Mi na 5ª corda casa 7 com as notas C, G e B nas cordas agudas.',
              startFret: 0,
              endFret: 4,
              markers: [
                { string: 6, fret: 0, note: 'E', interval: '3M', isRoot: false },
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '3M' },
                { string: 3, fret: 0, note: 'G', interval: '5J' },
                { string: 2, fret: 0, note: 'B', interval: '7M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-invtet-1',
            question: 'Qual grau ocupa o baixo num acorde de tétrade na 3ª Inversão?',
            options: [
              'A Terça',
              'A Quinta',
              'A Sétima (maior, menor ou diminuta)',
              'A Nona'
            ],
            correctAnswer: 2,
            explanation: 'Correto! A 3ª Inversão é exclusiva das tétrades e caracteriza-se por ter a sétima a soar na nota mais grave.'
          },
          {
            id: 'q-invtet-2',
            question: 'Na cifragem de uma terceira inversão como C/B, por que não é necessário escrever C7M/B?',
            options: [
              'Porque o B já é a sétima maior de Dó, tornando redundante especificar o 7M',
              'Porque o acorde perde a sétima',
              'Porque o acorde vira menor',
              'Porque se trata de um erro de notação'
            ],
            correctAnswer: 0,
            explanation: 'Exato! Como o Si (B) já é a 7ª maior de Dó, a presença da nota no baixo deixa subentendido tratar-se de um acorde com sétima.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    level: 'intermediario',
    slug: 'campo-harmonico-maior-e-funcoes',
    title: 'Módulo 5: Campo Harmônico Maior & Funções Harmônicas',
    description: 'A família de acordes gerada pela escala maior, os 3 pilares funcionais (Tônica, Subdominante e Dominante) e as cadências clássicas.',
    lessons: [
      {
        id: 'les-5-1',
        slug: 'formacao-do-campo-harmonico-maior',
        title: 'Formação do Campo Harmônico Maior em Tétrades',
        subtitle: 'A regra fixa dos 7 graus: I7M, IIm7, IIIm7, IV7M, V7, VIm7 e VIIm7(b5).',
        readingTime: '8 min de estudo + prática',
        conceptSummary: [
          'Campo Harmônico é a família de acordes originada a partir das notas de uma mesma escala.',
          'Em tétrades, os graus maiores com 7M são o I e o IV (I7M e IV7M).',
          'Os graus menores com 7m são o II, III e VI (IIm7, IIIm7 e VIm7).',
          'O V grau é exclusivamente Maior com 7ª Menor (V7 - Dominante).',
          'O VII grau é Meio Diminuto: VIIm7(b5).'
        ],
        theoryContent: [
          {
            heading: 'A Regra dos Graus e Modos',
            body: 'Ao sobrepor terças diatônicas sobre cada nota da Escala Maior, encontramos um padrão imutável em qualquer tom: I7M, IIm7, IIIm7, IV7M, V7, VIm7 e VIIm7(b5). Isso significa que se a música estiver em Sol Maior, a fórmula é idêntica: G7M, Am7, Bm7, C7M, D7, Em7 e F#m7(b5).'
          },
          {
            heading: 'Como identificar o Tom da Música',
            body: 'Ao analisar uma cifra e perceber acordes como C7M, Am7, Dm7 e G7, você está diante dos graus I, VI, II e V de Dó Maior. Saber o campo harmônico permite tirar músicas de ouvido antecipando quais acordes pertencem à mesma família tonal.'
          }
        ],
        guitarApplication: {
          rule: 'Encha a harmonia visualizando a tônica no baixo: Graus I (C7M c.3 corda 5), II (Dm7 c.5 corda 5), IV (F7M c.1 corda 6) e V (G7 c.3 corda 6).',
          shapes: [
            {
              title: 'I7M e IV7M: Os dois acordes Maiores com 7M',
              description: 'C7M na 5ª corda (c.3) e F7M na 6ª corda (c.1). Ambos compartilham a mesma qualidade 7M.',
              startFret: 1,
              endFret: 5,
              markers: [
                { string: 6, fret: 1, note: 'F', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '7M' },
                { string: 3, fret: 2, note: 'A', interval: '3M' },
                { string: 2, fret: 1, note: 'C', interval: '5J' }
              ]
            },
            {
              title: 'V7: O Acorde Dominante Preparatório (Sol 7)',
              description: 'G7 na 6ª corda casa 3. O único grau maior com sétima menor no tom maior.',
              startFret: 2,
              endFret: 5,
              markers: [
                { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b7' },
                { string: 3, fret: 4, note: 'B', interval: '3M' },
                { string: 2, fret: 3, note: 'D', interval: '5J' }
              ]
            },
            {
              title: 'VIIm7(b5): O Acorde Meio Diminuto (Si Meio Diminuto)',
              description: 'Bm7(b5) na 5ª corda casa 2. Notas: Si, Fá, Lá e Ré.',
              startFret: 1,
              endFret: 4,
              markers: [
                { string: 5, fret: 2, note: 'B', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b5' },
                { string: 3, fret: 2, note: 'A', interval: 'b7' },
                { string: 2, fret: 3, note: 'D', interval: '3m' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-chm-1',
            question: 'Quais graus do Campo Harmônico Maior em tétrades possuem a estrutura com Sétima Maior (7M)?',
            options: [
              'Graus I e V',
              'Graus I e IV',
              'Graus II e VI',
              'Graus IV e V'
            ],
            correctAnswer: 1,
            explanation: 'Correto! Apenas o I7M e o IV7M possuem a sétima maior na escala diatônica maior.'
          },
          {
            id: 'q-chm-2',
            question: 'Qual é o acorde do V grau no Campo Harmônico de Sol Maior?',
            options: [
              'C7M',
              'D7',
              'Em7',
              'Am7'
            ],
            correctAnswer: 1,
            explanation: 'Exato! O quinto grau de Sol é a nota Ré, portanto temos a tétrade dominante D7.'
          }
        ]
      },
      {
        id: 'les-5-2',
        slug: 'funcoes-harmonicas-e-cadencias',
        title: 'As 3 Funções Harmônicas & Cadências Principais',
        subtitle: 'Tônica (repouso), Subdominante (afastamento) e Dominante (tensão): a física das sensações.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Função Tônica: Sentido de repouso e conclusão. Acorde principal: I7M; substitutos: IIIm7 e VIm7.',
          'Função Subdominante: Sentido de suspensão e leve instabilidade. Principal: IV7M; substituto: IIm7.',
          'Função Dominante: Forte tensão que chama a resolução na tônica. Principal: V7; substituto: VIIm7(b5).',
          'Cadência Perfeita: Movimento V -> I (conclusão enfática).',
          'Cadência Plagal: Movimento IV -> I (a cadência do "Amém").'
        ],
        theoryContent: [
          {
            heading: 'Por que os acordes se substituem?',
            body: 'Acordes que compartilham 3 das 4 notas possuem a mesma função harmônica. Em Dó Maior, C7M (C-E-G-B) e Em7 (E-G-B-D) compartilham E, G e B. Por isso, Em7 funciona como uma tônica mais suave. O mesmo vale para F7M e Dm7 (subdominantes) e G7 e Bm7(b5) (dominantes).'
          },
          {
            heading: 'Força das Funções',
            body: 'O I7M é a Tônica Forte, enquanto IIIm7 e VIm7 são fracas. O IV7M é o Subdominante Forte, enquanto IIm7 é meio forte. O V7 é o Dominante Forte por conter o trítono e a sensível resolvendo de forma direta.'
          }
        ],
        guitarApplication: {
          rule: 'Toque a cadência arquetípica C7M (Tônica) -> F7M (Subdominante) -> G7 (Dominante) -> C7M (Resolução) e perceba o ciclo de estabilidade, afastamento, tensão e repouso.',
          shapes: [
            {
              title: 'Cadência Perfeita: G7 -> C7M',
              description: 'A tensão do trítono em G7 (corda 6, c.3) resolvendo no repouso absoluto de C7M (corda 5, c.3).',
              startFret: 2,
              endFret: 5,
              markers: [
                { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b7' },
                { string: 3, fret: 4, note: 'B', interval: '3M' },
                { string: 2, fret: 3, note: 'D', interval: '5J' }
              ]
            },
            {
              title: 'Cadência Plagal: F7M -> C7M',
              description: 'Subdominante direto para a tônica, sem passar pelo dominante. Som solene característico.',
              startFret: 1,
              endFret: 4,
              markers: [
                { string: 6, fret: 1, note: 'F', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '7M' },
                { string: 3, fret: 2, note: 'A', interval: '3M' },
                { string: 2, fret: 1, note: 'C', interval: '5J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-func-1',
            question: 'Em Dó Maior, qual acorde exerce função Subdominante e pode substituir o IV7M (F7M)?',
            options: [
              'G7 (V7)',
              'Dm7 (IIm7)',
              'Em7 (IIIm7)',
              'Bm7(b5) (VIIm7b5)'
            ],
            correctAnswer: 1,
            explanation: 'Correto! Dm7 e F7M compartilham as notas Fá, Lá e Dó, ambos exercendo a função subdominante.'
          },
          {
            id: 'q-func-2',
            question: 'O que caracteriza uma Cadência Perfeita na harmonia funcional?',
            options: [
              'A passagem direta do grau IV para o grau I',
              'A passagem do acorde de função Dominante (V7) para a Tônica (I)',
              'Um acorde dominante indo para qualquer acorde que não seja a tônica',
              'O repouso final suspenso sobre o acorde dominante'
            ],
            correctAnswer: 1,
            explanation: 'Exato! A cadência V -> I no estado fundamental é a mais conclusiva da música tonal, denominada Cadência Perfeita.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-6',
    number: 6,
    level: 'intermediario',
    slug: 'tritono-e-cadencia-two-five',
    title: 'Módulo 6: O Trítono, Preparação Dominante & A Cadência ii - V - I',
    description: 'A física do intervalo de 3 tons, a atração da sensível para a tônica e a condução da progressão universal do Jazz e da MPB.',
    lessons: [
      {
        id: 'les-6-1',
        slug: 'o-tritono-e-a-preparacao-dominante',
        title: 'O Trítono e o Motor da Harmonia Funcional',
        subtitle: 'A distância de 3 tons (3M e 7m) e a resolução simétrica em direção ao I grau.',
        readingTime: '8 min de estudo + prática',
        conceptSummary: [
          'O Trítono é a distância de 3 tons inteiros (metade de uma oitava, 6 semitons).',
          'No acorde Dominante Primário (V7), ele ocorre exatamente entre a 3ª Maior e a 7ª Menor.',
          'Em Dó Maior (G7), o trítono é formado pelas notas Si e Fá.',
          'Mecânica de resolução: A 3ª Maior (sensível Si) sobe 1 semitom para a tônica (Dó), enquanto a 7ª Menor (Fá) desce 1 semitom para a terça (Mi).'
        ],
        theoryContent: [
          {
            heading: 'Por que o Trítono quer resolver?',
            body: 'O trítono é o intervalo de maior instabilidade e tensão acústica do sistema tonal. Quando tocado isolado ou no acorde de V7, os ouvidos humanos antecipam imediatamente o relaxamento. A nota Si tem forte atração melódica ascendente para o Dó, e o Fá resolve descendo para o Mi. Esse movimento convergente de semitons fecha a cadência.'
          },
          {
            heading: 'Dominante Primário vs Secundário',
            body: 'O Dominante Primário é aquele que prepara diretamente o I grau da tonalidade (ex: G7 para C7M). Qualquer acorde dominante que prepare outros graus diatônicos (como A7 preparando Dm7 ou E7 preparando Am7) é chamado de Dominante Secundário.'
          }
        ],
        guitarApplication: {
          rule: 'Toque o trítono Si-Fá isolado nas cordas 4 e 3 (Si na casa 9 corda 4, Fá na casa 10 corda 3) e resolva em Dó-Mi (Dó na casa 10 corda 4, Mi na casa 9 corda 3). Perceba o movimento contrário das duas vozes.',
          shapes: [
            {
              title: 'O Trítono Isolado Si-Fá (G7) Resolvendo em Dó-Mi (C)',
              description: 'Duas notas com máxima tensão resolvendo no intervalo de 3ª Maior consonante.',
              startFret: 8,
              endFret: 11,
              markers: [
                { string: 4, fret: 9, note: 'B', interval: '3M' },
                { string: 3, fret: 10, note: 'F', interval: '7m' }
              ]
            },
            {
              title: 'Resolução Completa de G7 para C7M (Drop 3 na 6ª corda)',
              description: 'G7 (corda 6 c.3, corda 4 c.3, corda 3 c.4, corda 2 c.3) -> C7M (corda 5 c.3, corda 4 c.2, corda 3 c.4, corda 2 c.5).',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: '7m' },
                { string: 3, fret: 4, note: 'B', interval: '3M' },
                { string: 2, fret: 3, note: 'D', interval: '5J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-tri-dom-1',
            question: 'Entre quais notas do acorde dominante G7 ocorre o intervalo de trítono?',
            options: [
              'Entre Sol e Ré',
              'Entre Si e Fá',
              'Entre Dó e Sol',
              'Entre Si e Ré'
            ],
            correctAnswer: 1,
            explanation: 'Correto! O trítono em G7 situa-se entre a 3ª maior (Si) e a 7ª menor (Fá), totalizando 3 tons de distância.'
          },
          {
            id: 'q-tri-dom-2',
            question: 'Qual movimento melódico a 3ª Maior (sensível) do dominante executa ao resolver na tônica?',
            options: [
              'Desce 1 tom',
              'Sobe 1 semitom em direção à tônica',
              'Permanece estática',
              'Salta uma quinta justa'
            ],
            correctAnswer: 1,
            explanation: 'Exato! A sensível atinge a tônica por meio-tom ascendente (ex: Si para Dó).'
          }
        ]
      },
      {
        id: 'les-6-2',
        slug: 'a-cadencia-two-five-one',
        title: 'A Cadência Universal ii - V - I Maior',
        subtitle: 'Subdominante -> Dominante -> Tônica: a condução do baixo em saltos de quarta justa.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'A cadência ii - V - I nasce do desmembramento do V7, antecipando o segundo grau cadencial (IIm7).',
          'Em Dó Maior, a sequência é: Dm7 (IIm7) -> G7 (V7) -> C7M (I7M).',
          'O baixo caminha pelo salto harmônico ideal: 4ª Justa ascendente (Ré -> Sol -> Dó).',
          'Nas vozes internas, a 7ª do Dm7 (Dó) desce meio tom para virar a 3ª de G7 (Si), garantindo condução contínua.'
        ],
        theoryContent: [
          {
            heading: 'Por que o ii - V - I é tão marcante?',
            body: 'Ao substituir o quarto grau (F7M) pelo segundo (Dm7), mantemos a função subdominante mas transformamos o movimento do baixo: em vez de Fá subindo 1 tom para Sol, temos Ré saltando uma quarta justa para Sol, e Sol saltando outra quarta para Dó. Esse movimento de quintas/quartas cíclicas é o encadeamento mais orgânico da música ocidental.'
          },
          {
            heading: 'Condução de Vozes no Instrumento',
            body: 'A beleza do Two-Five está em manter notas comuns ou movimentá-las por semitom enquanto o baixo salta. A 7ª de Dm7 (Dó) desce para a 3ª de G7 (Si), e a 7ª de G7 (Fá) desce para a 3ª de C7M (Mi). As notas guia resolvem em cascata.'
          }
        ],
        guitarApplication: {
          rule: 'Toque a cadência ii - V - I em bloco compacto nas cordas 5, 4, 3 e 2: Dm7 (c.5) -> G7 (baixo no Dó c.3 corda 5 ou corda 6 c.3) -> C7M (c.3).',
          shapes: [
            {
              title: 'Passo 1: Dm7 (IIm7) - Cordas 5, 4, 3 e 2',
              description: 'Ré (corda 5, c.5) -> Lá (corda 4, c.7) -> Dó (corda 3, c.5) -> Fá (corda 2, c.6). Função Subdominante.',
              startFret: 4,
              endFret: 8,
              markers: [
                { string: 5, fret: 5, note: 'D', interval: 'F', isRoot: true },
                { string: 4, fret: 7, note: 'A', interval: '5J' },
                { string: 3, fret: 5, note: 'b7', interval: 'b7' },
                { string: 2, fret: 6, note: 'F', interval: '3m' }
              ]
            },
            {
              title: 'Passo 2: G7 (V7) - Condução com Baixo na 6ª corda',
              description: 'Sol (corda 6, c.3) -> Fá (corda 4, c.3) -> Si (corda 3, c.4) -> Ré (corda 2, c.3). A 7ª do Dm7 (Dó) desceu para a 3ª (Si).',
              startFret: 2,
              endFret: 5,
              markers: [
                { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b7' },
                { string: 3, fret: 4, note: 'B', interval: '3M' },
                { string: 2, fret: 3, note: 'D', interval: '5J' }
              ]
            },
            {
              title: 'Passo 3: C7M (I7M) - Resolução Final',
              description: 'Dó (corda 5, c.3) -> Sol (corda 4, c.5) -> Si (corda 3, c.4) -> Mi (corda 2, c.5). Repouso absoluto.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 4, note: 'B', interval: '7M' },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-251-1',
            question: 'Em termos de funções harmônicas, qual é a ordem da progressão ii - V - I?',
            options: [
              'Tônica -> Dominante -> Subdominante',
              'Subdominante -> Dominante -> Tônica',
              'Dominante -> Subdominante -> Tônica',
              'Tônica -> Subdominante -> Dominante'
            ],
            correctAnswer: 1,
            explanation: 'Correto! O IIm7 exerce função subdominante, o V7 dominante de tensão e o I7M tônica de repouso.'
          },
          {
            id: 'q-251-2',
            question: 'Qual é a progressão ii - V - I na tonalidade de Fá Maior (F)?',
            options: [
              'Dm7 - G7 - C7M',
              'Gm7 - C7 - F7M',
              'Em7 - A7 - D7M',
              'Am7 - D7 - G7M'
            ],
            correctAnswer: 1,
            explanation: 'Exato! Em Fá Maior, o II grau é Sol Menor (Gm7), o V grau é Dó Dominante (C7) e o I grau é Fá Maior (F7M).'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-7',
    number: 7,
    level: 'intermediario',
    slug: 'universo-dos-tons-menores',
    title: 'Módulo 7: O Universo dos Tons Menores Integrados & A Cadência ii - V - i',
    description: 'A unificação das 3 escalas menores, as famílias de tétrades híbridas e a cadência menor universal IIm7(b5) -> V7(b9) -> Im7.',
    lessons: [
      {
        id: 'les-7-1',
        slug: 'as-tres-escalas-menores-e-campos-unificados',
        title: 'As 3 Escalas Menores & O Campo Harmónico Híbrido',
        subtitle: 'Menor Natural (modal), Menor Harmónica (resgate da sensível) e Menor Melódica (fluidez melódica).',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'A Escala Menor Natural não possui sensível (sétimo grau é menor, bVII), gerando um Vm7 sem função dominante.',
          'A Escala Menor Harmónica eleva o sétimo grau para 7M (sensível), restaurando o acorde dominante V7 e gerando o acorde diminuto no VII grau (VII°).',
          'A Escala Menor Melódica eleva também o sexto grau para 6M, eliminando o salto áspero de 1 tom e meio e gerando o acorde IV7 e Im(7M).',
          'Na prática, o tom menor não escolhe apenas uma escala: a música passeia pelos 3 campos harmónicos em simultâneo.'
        ],
        theoryContent: [
          {
            heading: 'Por que existem 3 escalas menores?',
            body: 'A escala menor natural é herdada do modo eólio e carece da atração do trítono para repousar no I grau. Para que o acorde V pudesse ser dominante (V7), os mestres da harmonia elevaram a 7ª menor em meio tom, criando a Menor Harmónica. Contudo, o espaço entre a 6ª menor e a 7ª maior gerou um salto melódico de 1 tom e meio (segunda aumentada). Para suavizar a linha cantada, subiu-se também a 6ª em meio tom, concebendo a Menor Melódica.'
          },
          {
            heading: 'O Campo Harmónico Menor Unificado',
            body: 'Ao analisar canções em tom menor, encontraremos acordes da Menor Natural (como bVI7M e bVII7), da Menor Harmónica (como V7 e VII°) e da Menor Melódica (como IV7 e VIm7b5). Todos pertencem à mesma tonalidade menor expandida.'
          }
        ],
        guitarApplication: {
          rule: 'Em Lá Menor (Am), compare a sonoridade do acorde de repouso: o clássico Am7 (Menor Natural) vs. o tenso e sofisticado Am(7M) (Menor Harmónica/Melódica).',
          shapes: [
            {
              title: 'Am7 (Menor Natural - Tonalidade Relativa de Dó)',
              description: 'Lá (corda 5, c.0) -> Mi (corda 4, c.2) -> Sol (corda 3, c.0) -> Dó (corda 2, c.1). Sonoridade suave.',
              startFret: 0,
              endFret: 3,
              markers: [
                { string: 5, fret: 0, note: 'A', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '5J' },
                { string: 3, fret: 0, note: 'G', interval: 'b7' },
                { string: 2, fret: 1, note: 'C', interval: 'b3' }
              ]
            },
            {
              title: 'Am(7M) (Menor Harmónica / Melódica)',
              description: 'A 7ª sobe meio tom: Sol passa a Sol# (corda 3 casa 1). O acorde do agente secreto (clichê de suspense).',
              startFret: 0,
              endFret: 3,
              markers: [
                { string: 5, fret: 0, note: 'A', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '5J' },
                { string: 3, fret: 1, note: 'G#', interval: '7M' },
                { string: 2, fret: 1, note: 'C', interval: 'b3' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-menor-1',
            question: 'Qual alteração intervalar deu origem à Escala Menor Harmónica a partir da Menor Natural?',
            options: [
              'A elevação do quarto grau em 1 semitom (#4)',
              'A elevação do sétimo grau menor (b7) para sétimo grau maior (7M - Sensível)',
              'O rebaixamento da quinta justa (b5)',
              'A elevação da terça para terça maior (3M)'
            ],
            correctAnswer: 1,
            explanation: 'Correto! A Menor Harmónica foi concebida elevando o 7º grau para gerar a sensível e possibilitar a existência do dominante V7.'
          },
          {
            id: 'q-menor-2',
            question: 'Em Lá Menor, qual acorde exerce a função de Dominante Primário preparando o repouso em Am?',
            options: [
              'Em7',
              'G7',
              'E7',
              'Dm7'
            ],
            correctAnswer: 2,
            explanation: 'Exato! O V7 de Lá Menor é E7 (Mi Dominante), contendo o trítono Sol#-Ré oriundo da escala Menor Harmónica.'
          }
        ]
      },
      {
        id: 'les-7-2',
        slug: 'a-cadencia-two-five-one-menor',
        title: 'A Cadência Universal ii - V - i Menor',
        subtitle: 'IIm7(b5) -> V7(b9) -> Im7: a condução do Two-Five nos tons menores.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'No tom menor, o segundo grau cadencial é Meio Diminuto: IIm7(b5).',
          'O acorde Dominante V7 recebe a tensão nona menor (b9), derivada da escala menor harmónica.',
          'Em Lá Menor, a cadência é: Bm7(b5) -> E7(b9) -> Am7.',
          'Condução de baixos: Si (IIm7b5) salta uma 4ª justa para Mi (V7b9), que salta outra 4ª para Lá (Im7).'
        ],
        theoryContent: [
          {
            heading: 'Por que o ii menor é meio diminuto?',
            body: 'Na tonalidade de Lá Menor, a escala possui a nota Fá natural (sexta menor da escala). Quando montamos o segundo grau sobre a nota Si (Si - Ré - Fá - Lá), a distância de Si até Fá é uma quinta diminuta. Por isso, a escolha diatónica e orgânica no tom menor é o acorde IIm7(b5), e não o IIm7 comum.'
          },
          {
            heading: 'O Papel da Nona Menor (b9) no Dominante',
            body: 'O acorde E7 com a nota Fá no topo forma o E7(b9). A nota Fá (b9) resolve descendo meio tom para a nota Mi (5ª justa de Am), enquanto a sensível Sol# sobe meio tom para a tônica Lá. É a cadência de maior riqueza melódica da Bossa Nova e do Jazz contemporâneo.'
          }
        ],
        guitarApplication: {
          rule: 'Execute a cadência ii - V - i menor no formato sem pestana: Bm7(b5) na corda 5 (c.2) -> E7(b9) na corda 5 (c.7) ou corda 6 (c.0 com shapes centrais) -> Am7 (c.5 ou aberto).',
          shapes: [
            {
              title: 'Passo 1: Bm7(b5) (IIm7b5) - Cordas 5, 4, 3 e 2',
              description: 'Si (corda 5, c.2) -> Fá (corda 4, c.3) -> Lá (corda 3, c.2) -> Ré (corda 2, c.3). O segundo cadencial menor.',
              startFret: 1,
              endFret: 4,
              markers: [
                { string: 5, fret: 2, note: 'B', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b5' },
                { string: 3, fret: 2, note: 'A', interval: 'b7' },
                { string: 2, fret: 3, note: 'D', interval: '3m' }
              ]
            },
            {
              title: 'Passo 2: E7(b9) (V7b9) - Cordas 5, 4, 3 e 2',
              description: 'Mi (corda 5, c.7) -> Sol# (corda 4, c.6) -> Ré (corda 3, c.7) -> Fá (corda 2, c.6). Tensão máxima.',
              startFret: 5,
              endFret: 8,
              markers: [
                { string: 5, fret: 7, note: 'E', interval: 'F', isRoot: true },
                { string: 4, fret: 6, note: 'G#', interval: '3M' },
                { string: 3, fret: 7, note: 'D', interval: 'b7' },
                { string: 2, fret: 6, note: 'F', interval: 'b2' }
              ]
            },
            {
              title: 'Passo 3: Am7 (Im7) - Resolução Final Menor',
              description: 'Lá (corda 5, c.0) -> Mi (corda 4, c.2) -> Sol (corda 3, c.0) -> Dó (corda 2, c.1). Repouso no tom menor.',
              startFret: 0,
              endFret: 3,
              markers: [
                { string: 5, fret: 0, note: 'A', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '5J' },
                { string: 3, fret: 0, note: 'G', interval: 'b7' },
                { string: 2, fret: 1, note: 'C', interval: 'b3' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-251m-1',
            question: 'Qual é o formato do acorde do segundo grau cadencial numa progressão ii - V - i menor?',
            options: [
              'Tétrade Menor com Sétima (IIm7)',
              'Tétrade Meio Diminuta (IIm7(b5))',
              'Tétrade Diminuta (II°)',
              'Tétrade Maior com Sétima (II7)'
            ],
            correctAnswer: 1,
            explanation: 'Correto! No tom menor, o segundo grau é meio diminuto (IIm7(b5)) devido à 6ª menor da escala.'
          },
          {
            id: 'q-251m-2',
            question: 'Qual é a progressão ii - V - i na tonalidade de Dó Menor (Cm)?',
            options: [
              'Dm7 - G7 - C7M',
              'Dm7(b5) - G7(b9) - Cm7',
              'Em7(b5) - A7 - Dm7',
              'Fm7 - Bb7 - Eb7M'
            ],
            correctAnswer: 1,
            explanation: 'Exato! Em Dó Menor, o segundo grau é Dm7(b5), o dominante é G7(b9) e o repouso tónico é Cm7.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-8',
    number: 8,
    level: 'avancado',
    slug: 'dominantes-secundarios-e-estendidos',
    title: 'Módulo 8: Dominantes Secundários, Estendidos & V7sus4',
    description: 'A expansão da harmonia funcional: preparação para graus diatónicos, cadeia de dominantes estendidos e a dupla função do V7sus4.',
    lessons: [
      {
        id: 'les-8-1',
        slug: 'dominantes-secundarios-e-two-five-secundario',
        title: 'Dominantes Secundários & ii - V Secundário',
        subtitle: 'Preparando acordes diatónicos e aplicando o dois cadencial maior (IIm7) e menor (IIm7b5).',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Dominante Primário prepara o grau I (ex: G7 para C7M).',
          'Dominantes Secundários preparam os outros graus da tonalidade (V7/II, V7/III, V7/IV, V7/V, V7/VI).',
          'O grau VIIm7(b5) não possui dominante secundário, pois a sua 5ª diminuta impede repouso tonal.',
          'Cada dominante secundário pode ser desmembrado em um ii - V secundário.',
          'Para alvos maiores usa-se IIm7; para alvos menores usa-se IIm7(b5) para respeitar a escala do momento.'
        ],
        theoryContent: [
          {
            heading: 'O que são Dominantes Secundários?',
            body: 'Numa música tonal, a harmonia pode afastar-se temporariamente do centro criando pequenos centros de tensão e resolução. O acorde dominante que prepara qualquer grau diatónico diferente do I é um dominante secundário (ex: A7 preparando Dm7 em Dó Maior). Nas análises, indica-se com uma seta curva para o acorde alvo.'
          },
          {
            heading: 'O ii - V Secundário e a Adaptação ao Alvo',
            body: 'Ao preparar um acorde menor (como Dm7 no tom de C), o dois cadencial ideal é Em7(b5) e não Em7, pois a tonalidade momentânea de Ré Menor contém a nota Si bemol. Já para preparar um acorde maior (como F7M), utiliza-se Gm7 -> C7.'
          }
        ],
        guitarApplication: {
          rule: 'Pratica o desmembramento preparando o IIm7 (Dm7): Em7(b5) (casa 7 corda 5) -> A7 (casa 5 corda 6) -> Dm7 (casa 5 corda 5).',
          shapes: [
            {
              title: 'ii - V Secundário para Acorde Menor (Dm7)',
              description: 'Em7(b5) (corda 5 c.7) seguido de A7 (corda 6 c.5) resolvendo em Dm7 (corda 5 c.5).',
              startFret: 4,
              endFret: 8,
              markers: [
                { string: 5, fret: 7, note: 'E', interval: 'F', isRoot: true },
                { string: 4, fret: 8, note: 'Bb', interval: 'b5' },
                { string: 3, fret: 7, note: 'D', interval: 'b7' },
                { string: 2, fret: 8, note: 'G', interval: '3m' }
              ]
            },
            {
              title: 'Dominante Secundário A7 (V7/II)',
              description: 'A7 na 6ª corda casa 5 preparando a chegada a Dm7.',
              startFret: 4,
              endFret: 7,
              markers: [
                { string: 6, fret: 5, note: 'A', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: 'b7' },
                { string: 3, fret: 6, note: 'C#', interval: '3M' },
                { string: 2, fret: 5, note: 'E', interval: '5J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-domsec-1',
            question: 'Por que motivo o grau VIIm7(b5) não admite dominante secundário?',
            options: [
              'Porque já possui função dominante natural',
              'Porque a sua quinta diminuta torna o acorde instável e inadequado para repouso momentâneo',
              'Porque não pertence ao campo harmónico',
              'Porque é um acorde invertido'
            ],
            correctAnswer: 1,
            explanation: 'Correto! Acordes meio diminutos contêm quinta diminuta e instabilidade própria, não funcionando como centros de resolução tonal.'
          },
          {
            id: 'q-domsec-2',
            question: 'Qual é o ii - V secundário mais diatónico para preparar o acorde Dm7 em Dó Maior?',
            options: [
              'Em7 -> A7',
              'Em7(b5) -> A7',
              'Gm7 -> C7',
              'Am7 -> D7'
            ],
            correctAnswer: 1,
            explanation: 'Exato! Em7(b5) possui a nota Si bemol (b6 de Ré Menor), soando perfeitamente diatónico à sonoridade menor do alvo.'
          }
        ]
      },
      {
        id: 'les-8-2',
        slug: 'dominantes-estendidos-e-v7sus4',
        title: 'Cadeia de Dominantes Estendidos & O Acorde V7sus4',
        subtitle: 'Ciclos de dominantes consecutivos e a dupla personalidade funcional do sus4.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Dominantes Estendidos preparam outros dominantes que não pertencem ao tom principal nem aos secundários.',
          'Formam uma cadeia em círculo de quintas: E7 -> A7 -> D7 -> G7 -> C7M.',
          'O acorde V7sus4 substitui a 3ª pela 4ª justa (1 - 4 - 5 - b7), removendo o trítono e a sensível.',
          'Dupla Personalidade: Se precede o grau I, exerce função Dominante suave. Se precede o próprio V7, exerce função Subdominante (IIm7 disfarçado).'
        ],
        theoryContent: [
          {
            heading: 'A Cadeia de Dominantes Estendidos',
            body: 'Quando um dominante prepara outro dominante sucessivamente (ex: B7 -> E7 -> A7 -> D7 -> G7 -> C), temos uma cadeia de dominantes estendidos. Essa condução cíclica por quartas justas ascendentes gera constante antecipação e movimento até ao repouso final na tónica.'
          },
          {
            heading: 'O Acorde V7sus4 e a Dupla Função',
            body: 'Em G7sus4 (Sol, Dó, Ré, Fá), as notas formam um Dm7(11) sem baixo em Ré. Se tocado antes do G7 (Dm7 -> G7sus4 -> G7 -> C7M), o acorde funciona como dois cadencial subdominante. Se resolver diretamente em C7M, funciona como preparação dominante.'
          }
        ],
        guitarApplication: {
          rule: 'Experimenta a progressão clássica: G7sus4 (corda 6 c.3, corda 4 c.3, corda 3 c.5, corda 2 c.3) -> G7 (desce a corda 3 para casa 4) -> C7M.',
          shapes: [
            {
              title: 'G7sus4 (Substituição de 3ª por 4ª)',
              description: 'Sol (corda 6 c.3) -> Fá (corda 4 c.3) -> Dó (corda 3 c.5, 4ª justa suspensa) -> Ré (corda 2 c.3).',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b7' },
                { string: 3, fret: 5, note: '4J', interval: '4J' },
                { string: 2, fret: 3, note: 'D', interval: '5J' }
              ]
            },
            {
              title: 'Resolução da Suspensão: G7 Dominante',
              description: 'A 4ª justa Dó (casa 5) desce meio tom para a 3ª maior Si (casa 4), ativando o trítono.',
              startFret: 2,
              endFret: 5,
              markers: [
                { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b7' },
                { string: 3, fret: 4, note: 'B', interval: '3M' },
                { string: 2, fret: 3, note: 'D', interval: '5J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-sus-1',
            question: 'Qual função o acorde G7sus4 assume quando precede diretamente o acorde G7 na sequência Dm7 -> G7sus4 -> G7 -> C7M?',
            options: [
              'Função Tónica de repouso',
              'Função Subdominante, atuando como substituto do dois cadencial',
              'Função Dominante com máxima tensão',
              'Empréstimo modal'
            ],
            correctAnswer: 1,
            explanation: 'Correto! Ao preceder o V7, o G7sus4 atua como um Dm7(11) disfarçado, exercendo papel subdominante.'
          },
          {
            id: 'q-sus-2',
            question: 'Numa cadeia de dominantes estendidos finalizando em C7M (E7 -> A7 -> D7 -> G7 -> C7M), o que caracteriza os acordes E7 e A7?',
            options: [
              'São dominantes secundários',
              'São dominantes estendidos que preparam outros acordes dominantes',
              'São acordes de empréstimo modal',
              'São tríades diminutas'
            ],
            correctAnswer: 1,
            explanation: 'Exato! Acordes que preparam outros dominantes fora da tonalidade são classificados como Dominantes Estendidos.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-9',
    number: 9,
    level: 'avancado',
    slug: 'subv7-diminutos-e-linhas-internas',
    title: 'Módulo 9: SubV7, Diminutos & Linhas Internas',
    description: 'Substituição por trítono descendente, a distinção entre diminutos funcionais e de passagem, e o contraponto cromático dos line clichés.',
    lessons: [
      {
        id: 'les-9-1',
        slug: 'subv7-e-resolucao-cromatica',
        title: 'SubV7 & A Resolução Cromática do Baixo',
        subtitle: 'O substituto do dominante pelo mesmo trítono localizado 1 semitom acima do alvo.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'O SubV7 é um acorde dominante substituto localizado a uma 5ª diminuta do V7 original ou 1 semitom acima do alvo.',
          'Partilha exatamente o mesmo trítono e a mesma sensível do dominante primário (em C, G7 e Db7 partilham Si e Fá).',
          'A resolução no baixo deixa de ser por salto de 4ª justa e passa a ser por cromatismo descendente: Ré -> Réb -> Dó.',
          'Cadência Two-SubV7: IIm7 -> SubV7 -> I7M (ex: Dm7 -> Db7 -> C7M).'
        ],
        theoryContent: [
          {
            heading: 'A Mecânica do Substituto de Trítono',
            body: 'Como o intervalo de trítono divide a oitava exatamente ao meio (3 tons), ao inverter as suas notas obtemos a mesma distância acústica. Em G7, o trítono é Si-Fá. Ao construir um acorde dominante a partir da 5ª diminuta de Sol (Db7), encontramos as notas Réb, Fá, Láb e Dób (Si). O trítono mantém-se idêntico, mas o baixo agora caminha meio tom abaixo diretamente para o repouso.'
          },
          {
            heading: 'SubV7 Secundário',
            body: 'Assim como os dominantes primários podem ser substituídos por SubV7, qualquer dominante secundário também possui o seu substituto cromático (ex: Gb7 preparando F7M no tom de Dó).'
          }
        ],
        guitarApplication: {
          rule: 'Nas cordas 5, 4, 3 e 2, repara como a transição Dm7 -> Db7 -> C7M conduz o baixo num deslize cromático contínuo da casa 5 para a 4 e depois para a 3.',
          shapes: [
            {
              title: 'SubV7 Primário: Db7 (Cordas 5, 4, 3 e 2)',
              description: 'Réb (corda 5, c.4) -> Fá (corda 4, c.3) -> Sib/Dób (corda 3, c.4) -> Fá (corda 2, c.6) ou Láb (c.4). Fórmula F - 3M - b7 - 5J.',
              startFret: 3,
              endFret: 6,
              markers: [
                { string: 5, fret: 4, note: 'Db', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: '3M' },
                { string: 3, fret: 4, note: 'B', interval: 'b7' },
                { string: 2, fret: 6, note: 'F', interval: '3M' }
              ]
            },
            {
              title: 'Cadência Cromática Completa: Dm7 -> Db7 -> C7M',
              description: 'Dm7 (c.5) -> Db7 (c.4) -> C7M (c.3). O baixo percorre D -> Db -> C sem quebras.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 4, note: 'Db', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: '3M' },
                { string: 3, fret: 4, note: 'B', interval: 'b7' },
                { string: 2, fret: 4, note: 'Ab', interval: '5J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-subv-1',
            question: 'Qual é o intervalo de distância entre o dominante primário V7 e o seu respectivo SubV7?',
            options: [
              'Uma 4ª Justa',
              'Uma 5ª Diminuta (Trítono)',
              'Um Tom inteiro',
              'Uma Terça Menor'
            ],
            correctAnswer: 1,
            explanation: 'Correto! O SubV7 localiza-se a uma 5ª diminuta (trítono) do V7 original, partilhando as mesmas notas guia.'
          },
          {
            id: 'q-subv-2',
            question: 'Em Dó Maior, qual é o acorde SubV7 que prepara diretamente o repouso em C7M?',
            options: [
              'D7',
              'Db7',
              'Eb7',
              'Ab7'
            ],
            correctAnswer: 1,
            explanation: 'Exato! Db7 localiza-se meio tom acima do alvo Dó, resolvendo cromaticamente de forma descendente.'
          }
        ]
      },
      {
        id: 'les-9-2',
        slug: 'diminutos-preparacao-e-aproximacao',
        title: 'Diminutos de Preparação vs. Aproximação',
        subtitle: 'A distinção fundamental entre o diminuto dominante e os diminutos cromáticos de passagem.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Diminuto de Preparação: Funciona como um dominante V7(b9) sem a fundamental, localizado 1 semitom abaixo do alvo (ex: B° preparando C7M).',
          'Diminuto Auxiliar: Mantém o mesmo baixo da tónica e aproxima vozes internas (ex: D° -> D7M).',
          'Diminuto Descendente: Ocorre estritamente na passagem do IIIm7 para o IIm7 (ex: Em7 -> Eb° -> Dm7).',
          'Diminuto Ascendente: Conecta baixos que sobem meio tom em direção a acordes invertidos (ex: D#° -> C/E).'
        ],
        theoryContent: [
          {
            heading: 'Diminutos Funcionais (Preparação)',
            body: 'Ao retirar a fundamental Sol do acorde G7(b9), sobram as notas Si, Ré, Fá e Láb, que formam a tétrade B°. Como possui a sensível e o trítono da tonalidade, o acorde diminuto situado meio tom abaixo de qualquer grau funciona como preparação dominante.'
          },
          {
            heading: 'Diminutos Não-Funcionais (Aproximação)',
            body: 'Nem todo o diminuto tem função dominante. Quando surge entre o terceiro e o segundo grau (Em7 -> Eb° -> Dm7), atua como uma ponte cromática de passagem. Já o diminuto auxiliar surge sobre a mesma nota fundamental embelezando a harmonia sem mudar o centro tonal.'
          }
        ],
        guitarApplication: {
          rule: 'Compara no braço o som tenso de preparação B° (casa 2 corda 5) -> C7M com o som de passagem melódica Em7 -> Eb° (casa 6 corda 5) -> Dm7.',
          shapes: [
            {
              title: 'Diminuto de Preparação: B° -> C7M',
              description: 'Si (corda 5, c.2) -> Fá (corda 4, c.3) -> Láb (corda 3, c.1) -> Ré (corda 2, c.3). Meio tom abaixo de C.',
              startFret: 1,
              endFret: 4,
              markers: [
                { string: 5, fret: 2, note: 'B', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b5' },
                { string: 3, fret: 1, note: 'Ab', interval: 'bb7' },
                { string: 2, fret: 3, note: 'D', interval: '3m' }
              ]
            },
            {
              title: 'Diminuto de Aproximação Descendente: Eb°',
              description: 'Ponte cromática entre Em7 e Dm7. Mib (corda 5, c.6) -> Lá (corda 4, c.7) -> Dó (corda 3, c.5) -> Solb (corda 2, c.7).',
              startFret: 5,
              endFret: 8,
              markers: [
                { string: 5, fret: 6, note: 'Eb', interval: 'F', isRoot: true },
                { string: 4, fret: 7, note: 'A', interval: 'b5' },
                { string: 3, fret: 5, note: 'C', interval: 'bb7' },
                { string: 2, fret: 7, note: 'Gb', interval: '3m' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-dim-1',
            question: 'Qual acorde diminuto de preparação substitui o dominante primário de Dó Maior (G7)?',
            options: [
              'C#°',
              'B°',
              'D#°',
              'F°'
            ],
            correctAnswer: 1,
            explanation: 'Correto! B° localiza-se na terça maior de G7 (ou 1 semitom abaixo de C), funcionando como dominante sem fundamental.'
          },
          {
            id: 'q-dim-2',
            question: 'Na passagem harmónica Em7 -> Eb° -> Dm7 em Dó Maior, como se classifica o acorde Eb°?',
            options: [
              'Diminuto de Preparação',
              'Diminuto Auxiliar',
              'Diminuto de Aproximação Descendente',
              'Acorde de Empréstimo Modal'
            ],
            correctAnswer: 2,
            explanation: 'Exato! O diminuto situado entre o IIIm7 e o IIm7 classifica-se como aproximação cromática descendente.'
          }
        ]
      },
      {
        id: 'les-9-3',
        slug: 'linhas-internas-line-cliches',
        title: 'Linhas Internas (Line Clichés) no Violão & Guitarra',
        subtitle: 'Movimento cromático de contraponto interno em acordes Menores, Maiores e Dominantes.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Line Clichés são linhas melódicas cromáticas que se movem por dentro de uma harmonia estática.',
          'Em acordes Menores, o clichê mais clássico desce a partir da oitava: 8 -> 7M -> 7m -> 6M (ex: Am -> Am(7M) -> Am7 -> Am6).',
          'Em acordes Maiores, o movimento pode subir a partir da quinta justa: 5 -> #5 -> 6 -> #5 -> 5.',
          'Em acordes Dominantes, a linha cromática conduz a tensão da nona para o acorde alvo: 9 -> b9 -> 5 do acorde de repouso.'
        ],
        theoryContent: [
          {
            heading: 'O Conceito de Contraponto nos Acordes',
            body: 'Em vez de trocar de acorde a cada compasso, os line clichés criam dinamismo alterando apenas uma voz enquanto as restantes notas permanecem presas. Este recurso é a assinatura melódica de standards universais da Bossa Nova e do Jazz, transformando acordes estáticos em arranjos cinematográficos.'
          },
          {
            heading: 'A Condução Descendente em Tons Menores',
            body: 'Ao segurar a tétrade de Am e movimentar apenas a corda onde soa a oitava (Lá -> Sol# -> Sol natural -> Fá#), o acorde transmuta sucessivamente por Am, Am(7M), Am7 e Am6. A mão esquerda move apenas um dedo por casa.'
          }
        ],
        guitarApplication: {
          rule: 'Toca a sequência Am -> Am(7M) -> Am7 -> Am6 mantendo o baixo Lá na corda 5 solta e movimentando apenas o dedo na 4ª corda da casa 7 até à casa 4.',
          shapes: [
            {
              title: 'Line Cliché Passo 1: Am (Oitava Lá na casa 7)',
              description: 'Lá (corda 5 solta) -> Lá (corda 4, c.7) -> Dó (corda 3, c.5) -> Mi (corda 2, c.5). Ponto de partida (grau 8).',
              startFret: 4,
              endFret: 8,
              markers: [
                { string: 5, fret: 0, note: 'A', interval: 'F', isRoot: true },
                { string: 4, fret: 7, note: 'A', interval: '8J' },
                { string: 3, fret: 5, note: 'C', interval: '3m' },
                { string: 2, fret: 5, note: 'E', interval: '5J' }
              ]
            },
            {
              title: 'Line Cliché Passo 2: Am(7M) (A voz desce para Sol#)',
              description: 'A 4ª corda recua 1 traste para a casa 6 (Sol# - 7M). Tensão marcante.',
              startFret: 4,
              endFret: 7,
              markers: [
                { string: 5, fret: 0, note: 'A', interval: 'F', isRoot: true },
                { string: 4, fret: 6, note: 'G#', interval: '7M' },
                { string: 3, fret: 5, note: 'C', interval: '3m' },
                { string: 2, fret: 5, note: 'E', interval: '5J' }
              ]
            },
            {
              title: 'Line Cliché Passo 3: Am7 (A voz desce para Sol natural)',
              description: 'A 4ª corda recua mais 1 traste para a casa 5 (Sol - 7m).',
              startFret: 4,
              endFret: 6,
              markers: [
                { string: 5, fret: 0, note: 'A', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: 'b7' },
                { string: 3, fret: 5, note: 'C', interval: '3m' },
                { string: 2, fret: 5, note: 'E', interval: '5J' }
              ]
            },
            {
              title: 'Line Cliché Passo 4: Am6 (A voz desce para Fá#)',
              description: 'A 4ª corda desce para a casa 4 (Fá# - 6M), completando a resolução melódica.',
              startFret: 3,
              endFret: 6,
              markers: [
                { string: 5, fret: 0, note: 'A', interval: 'F', isRoot: true },
                { string: 4, fret: 4, note: 'F#', interval: '6M' },
                { string: 3, fret: 5, note: 'C', interval: '3m' },
                { string: 2, fret: 5, note: 'E', interval: '5J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-line-1',
            question: 'Qual é o caminho intervalar descendente mais comum num line cliché aplicado a acordes menores?',
            options: [
              '1 -> b2 -> 2 -> b3',
              '8 -> 7M -> 7m -> 6M',
              '5 -> #5 -> 6 -> b7',
              'b3 -> 3 -> 4 -> #4'
            ],
            correctAnswer: 1,
            explanation: 'Correto! A descida cromática da oitava (8 -> 7M -> 7m -> 6M) é o clichê mais emblemático em acordes menores.'
          },
          {
            id: 'q-line-2',
            question: 'Em termos de arranjo e harmonia, qual é o principal benefício de um line cliché?',
            options: [
              'Modular obrigatoriamente para outra tonalidade distante',
              'Criar contraponto melódico dinâmico mantendo a harmonia base estável',
              'Eliminar a função tónica da música',
              'Substituir a necessidade de ritmo'
            ],
            correctAnswer: 1,
            explanation: 'Exato! O line cliché traz movimentação contrapontística sem necessidade de alterar a tónica do acorde.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-10',
    number: 10,
    level: 'avancado',
    slug: 'acordes-de-emprestimo-modal',
    title: 'Módulo 10: Acordes de Empréstimo Modal (AEM)',
    description: 'A importação de cores da tonalidade homónima menor e modos gregos para enriquecer progressões sem gerar modulação.',
    lessons: [
      {
        id: 'les-10-1',
        slug: 'conceito-de-aem-e-homonimos-menores',
        title: 'Conceito de AEM & Os Acordes do Tom Menor Homónimo',
        subtitle: 'Tonalidades homónimas, acordes excluídos e os pilares: IVm6, bVI7M, bVII7 e bIII7M.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Acordes de Empréstimo Modal (AEM) vêm de tonalidades homónimas (mesma tónica, modos diferentes, ex: Dó Maior e Dó Menor).',
          'O AEM surge de passagem e não configura modulação: a tonalidade principal mantém-se intacta.',
          'Acordes do tom menor que NÃO são AEM no tom maior: IIm7 (já existe), V7 (já pertence ao tom) e VIIm7(b5) (inútil no tom maior).',
          'Os AEMs mais recorrentes no tom maior são: IVm / IVm6 (clássico de Bossa e MPB), bVI7M, bVII7 e bIII7M.'
        ],
        theoryContent: [
          {
            heading: 'O que são Tonalidades Homónimas?',
            body: 'Tonalidades homónimas partilham a mesma nota tónica, mas possuem estruturas de escala opostas (ex: C Maior e C Menor). Quando uma música em modo maior pede emprestado acordes gerados pela escala menor homónima, cria contrastes de sombra e melancolia sem perder o centro tonal de repouso.'
          },
          {
            heading: 'O Emblemático Subdominante Menor (IVm6)',
            body: 'No tom de Dó Maior, o quarto grau diatónico é F7M. Ao substituí-lo por Fm ou Fm6 (Fá Menor com 6ª Maior), importamos as notas Láb e Ré da menor homónima. A descida cromática Lá -> Láb -> Sol (em C7M -> Fm6 -> C7M) é o arquétipo harmónico de temas como "Flor de Lis" de Djavan.'
          }
        ],
        guitarApplication: {
          rule: 'Experimenta no braço a progressão clássica: C7M (c.3 corda 5) -> Fm6 (baixo em Fá c.1 corda 6) -> C7M, ouvindo a condução cromática da nota Lá para Láb e depois Sol.',
          shapes: [
            {
              title: 'IVm6 de Empréstimo Modal: Fm6 (Cordas 6, 4, 3 e 2)',
              description: 'Fá (corda 6, c.1) -> Ré (corda 4, c.0 ou c.3 corda 2) -> Láb (corda 3, c.1) -> Dó (corda 2, c.1). Som intimista.',
              startFret: 0,
              endFret: 3,
              markers: [
                { string: 6, fret: 1, note: 'F', interval: 'F', isRoot: true },
                { string: 4, fret: 0, note: 'D', interval: '6M' },
                { string: 3, fret: 1, note: 'Ab', interval: '3m' },
                { string: 2, fret: 1, note: 'C', interval: '5J' }
              ]
            },
            {
              title: 'Cadência Heroica: Ab7M (bVI7M) -> Bb7 (bVII7) -> C7M',
              description: 'Ab7M (c.4 corda 6) saltando para Bb7 (c.6 corda 6) e resolvendo na tónica C7M (c.3 corda 5).',
              startFret: 3,
              endFret: 7,
              markers: [
                { string: 6, fret: 4, note: 'Ab', interval: 'b6', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: '7M' },
                { string: 3, fret: 5, note: 'C', interval: '3M' },
                { string: 2, fret: 4, note: 'Eb', interval: '5J' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-aem-1',
            question: 'O que define rigorosamente um Acorde de Empréstimo Modal (AEM)?',
            options: [
              'Uma mudança permanente e definitiva de tonalidade no meio da partitura',
              'Um acorde importado de uma tonalidade homónima ou de um modo sem configurar modulação',
              'Qualquer acorde dominante secundário invertido',
              'Uma dissonância rítmica fora do compasso'
            ],
            correctAnswer: 1,
            explanation: 'Correto! O AEM é tomado de empréstimo de uma escala homónima sem que ocorra modulação de tom.'
          },
          {
            id: 'q-aem-2',
            question: 'Num tom de Sol Maior (G), qual dos seguintes acordes representa um AEM de quarto grau menor (IVm)?',
            options: [
              'C7M',
              'Cm ou Cm6',
              'Am7',
              'D7'
            ],
            correctAnswer: 1,
            explanation: 'Exato! Em Sol Maior, o IV grau diatónico é C7M; ao soar em versão menor (Cm ou Cm6), trata-se de um AEM.'
          }
        ]
      },
      {
        id: 'les-10-2',
        slug: 'aems-modos-gregos-e-tom-menor',
        title: 'AEMs de Modos Gregos & Empréstimos no Tom Menor',
        subtitle: 'O acorde Napolitano bII7M (Frígio), o bVII7M (Mixolídio) e empréstimos do tom maior.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'bII7M (Acorde Frígio / Napolitano): Atua preparando o I7M por semitom descendente suave (ex: Db7M -> C7M).',
          'bVII7M (Modo Mixolídio): Acorde maior com 7M sobre o sétimo grau bemolizado (ex: Bb7M em C Maior).',
          'Vm7 (Modo Frígio): Quinto grau menor (ex: Gm7 em Dó Maior), frequentemente antecedendo o IV7M.',
          'Empréstimo do Tom Maior para o Menor: Fenómeno mais raro onde uma canção em tom menor pede emprestado graus do maior (ex: IIIm7 em Lá Menor como na introdução de "O Morro Não Tem Vez").'
        ],
        theoryContent: [
          {
            heading: 'AEMs Derivados de Modos Gregos',
            body: 'Além das 3 escalas menores, podemos importar sonoridades de modos gregos homónimos. O acorde bII7M (Db7M em C) provém do modo Frígio e substitui o dominante com uma aproximação elegante. O acorde Vm7 (Gm7 em C) traz a desativação da sensível típica do ambiente modal frígio.'
          },
          {
            heading: 'O Tom Menor a Importar do Maior',
            body: 'Como o tom menor já possui três campos harmónicos ricos (Natural, Harmónica e Melódica), raramente necessita de recorrer ao modo maior. Quando acontece, gera forte surpresa acústica, como o uso do acorde IIIm7 do modo maior (C#m7 em Lá Menor na canção "O Morro Não Tem Vez" de Tom Jobim).'
          }
        ],
        guitarApplication: {
          rule: 'Toca a resolução frígia Db7M (bII7M na casa 4 corda 5) descendo meio tom para C7M (I7M na casa 3 corda 5). Repara na estabilidade serena deste encadeamento.',
          shapes: [
            {
              title: 'bII7M Frígio (Napolitano): Db7M (Cordas 5, 4, 3 e 2)',
              description: 'Réb (corda 5, c.4) -> Láb (corda 4, c.6) -> Dó (corda 3, c.5) -> Fá (corda 2, c.6). Preparação modal.',
              startFret: 3,
              endFret: 7,
              markers: [
                { string: 5, fret: 4, note: 'Db', interval: 'F', isRoot: true },
                { string: 4, fret: 6, note: 'Ab', interval: '5J' },
                { string: 3, fret: 5, note: 'C', interval: '7M' },
                { string: 2, fret: 6, note: 'F', interval: '3M' }
              ]
            },
            {
              title: 'Resolução no I7M: C7M',
              description: 'Dó (corda 5, c.3) -> Sol (corda 4, c.5) -> Si (corda 3, c.4) -> Mi (corda 2, c.5). O repouso diatónico.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 5, note: 'G', interval: '5J' },
                { string: 3, fret: 4, note: 'B', interval: '7M' },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-mod-aem-1',
            question: 'De qual modo grego provém o acorde de empréstimo bII7M (ex: Db7M em Dó Maior)?',
            options: [
              'Modo Lídio',
              'Modo Dórico',
              'Modo Frígio',
              'Modo Lócrio'
            ],
            correctAnswer: 2,
            explanation: 'Correto! O intervalo de segunda menor associado à tríade maior com 7M caracteriza a sonoridade do modo Frígio.'
          },
          {
            id: 'q-mod-aem-2',
            question: 'Por que motivo é menos frequente uma música em tom menor importar acordes do tom maior?',
            options: [
              'Porque as regras de harmonia clássica proíbem terminantemente esse uso',
              'Porque o tom menor já possui três campos harmónicos unificados com ampla variedade de acordes disponíveis',
              'Porque violões e guitarras não conseguem reproduzir essas notas',
              'Porque todos os acordes maiores soam desafinados no tom menor'
            ],
            correctAnswer: 1,
            explanation: 'Exato! A combinação da Menor Natural, Harmónica e Melódica já disponibiliza uma paleta alargada de acordes diatónicos.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-11',
    number: 11,
    level: 'avancado',
    slug: 'escalas-de-acordes-campo-maior',
    title: 'Módulo 11: Escalas de Acordes do Tom Maior & Tensões',
    description: 'A anatomia das chord scales: a regra de distância para notas de tensão vs. passagem e as 7 escalas diatónicas do campo maior.',
    lessons: [
      {
        id: 'les-11-1',
        slug: 'notas-de-acorde-tensao-e-passagem',
        title: 'Notas de Acorde, Notas de Tensão & Notas de Passagem',
        subtitle: 'A regra do tom vs. semitom: como identificar extensões possíveis sem choques harmónicos.',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Notas de Acorde: As 4 notas estruturais que constituem a tétrade (1, 3, 5 e 7)[cite: 271].',
          'Notas de Tensão: Notas da escala situadas a 1 Tom acima da nota de acorde anterior (representadas por intervalos compostos: T9, T11, T13)[cite: 271, 273].',
          'Notas de Passagem (Evitadas): Notas da escala situadas a apenas 1 Semitom acima da nota de acorde anterior (representadas por intervalos simples: P4, Pb2, Pb6)[cite: 271, 273].',
          'Na vertical (acorde), notas de passagem são proibidas; na horizontal (improvisação), são tocadas apenas em tempos fracos de passagem[cite: 272].'
        ],
        theoryContent: [
          {
            heading: 'A Regra Matemática da Tensão Acústica',
            body: 'Quando adicionamos uma nota que dista meio tom (segunda menor) acima de uma nota estrutural do acorde (especialmente a terça ou a tónica), gera-se uma dissonância áspera que descaracteriza a função do acorde[cite: 271, 272]. Em C7M (Dó-Mi-Sol-Si), a nota Fá dista meio tom de Mi, sendo portanto uma P4 (Passagem)[cite: 272, 274]. Já a nota Ré dista 1 tom de Dó, funcionando como uma T9 consonante[cite: 274].'
          },
          {
            heading: 'Tensões Diatónicas vs. Não-Diatónicas',
            body: 'Tensões diatónicas pertencem à escala de origem da tonalidade[cite: 271]. Conforme avançamos para os acordes dominantes secundários e alterados, notas fora da tonalidade original passam a ser incorporadas para gerar cores harmónicas mais profundas[cite: 271, 323].'
          }
        ],
        guitarApplication: {
          rule: 'Em C7M nas cordas centrais, toca a tétrade pura e experimenta acrescentar a 9ª Maior Ré (corda 2 casa 3) em contraste com a 4ª justa Fá (corda 2 casa 6 ou corda 1 casa 1), ouvindo o choque imediato da nota de passagem[cite: 274].',
          shapes: [
            {
              title: 'C7M com Tensão de 9ª Maior: C7M(9)',
              description: 'Dó (corda 5 c.3) -> Mi (corda 4 c.2) -> Si (corda 3 c.4) -> Ré (corda 2 c.3 - T9)[cite: 274]. Cor límpida e estável.',
              startFret: 2,
              endFret: 5,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '3M' },
                { string: 3, fret: 4, note: 'B', interval: '7M' },
                { string: 2, fret: 3, note: 'D', interval: '2M' }
              ]
            },
            {
              title: 'O Choque da Nota de Passagem (P4 Fá)',
              description: 'Ao pressionar a nota Fá (corda 2 c.6 ou corda 4 c.3) em simultâneo com a terça Mi, a vibração perde o repouso tonal[cite: 272, 274].',
              startFret: 1,
              endFret: 5,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: '4J' },
                { string: 3, fret: 4, note: 'B', interval: '7M' },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-cs-1',
            question: 'Qual é o critério de distância intervalar que define se uma nota da escala é Nota de Tensão ou Nota de Passagem[cite: 273]?',
            options: [
              'Se estiver a 1 Tom da nota de acorde anterior é Tensão; se estiver a 1 Semitom é de Passagem[cite: 273]',
              'Se for uma nota sustenida é de passagem, se for bemol é tensão',
              'Apenas as notas mais agudas que a oitava são notas de passagem',
              'Todas as notas da escala maior são notas de tensão'
            ],
            correctAnswer: 0,
            explanation: 'Correto! A distância de 1 tom em relação à nota de acorde anterior qualifica a extensão como Nota de Tensão, enquanto 1 semitom gera choque característico de Nota de Passagem[cite: 273].'
          },
          {
            id: 'q-cs-2',
            question: 'Por que razão a 4ª justa (Fá) é considerada nota de passagem (evitada) na escala Jónia sobre o acorde C7M[cite: 272, 274]?',
            options: [
              'Porque não pertence à escala de Dó Maior',
              'Porque dista apenas 1 semitom da terça maior Mi, gerando choque acústico direto na tétrade[cite: 272, 274]',
              'Porque altera a função do baixo',
              'Porque anula a afinação da guitarra'
            ],
            correctAnswer: 1,
            explanation: 'Exato! O intervalo de semitom entre a terça Mi e a quarta Fá inviabiliza o uso simultâneo no acorde sem descaracterizar a harmonia[cite: 272, 274].'
          }
        ]
      },
      {
        id: 'les-11-2',
        slug: 'as-sete-escalas-de-acordes-do-campo-maior',
        title: 'As 7 Escalas de Acordes do Campo Harmónico Maior',
        subtitle: 'Jónia, Dórica, Frígia, Lídia, Mixolídia, Eólia e Lócria: mapeamento exato de tensões em cada grau.',
        readingTime: '10 min de estudo + prática',
        conceptSummary: [
          'I7M -> Jónia: 1, T9, 3, P4, 5, 6, 7 (Tensões: 9, 6)[cite: 274].',
          'IIm7 -> Dórica: 1, T9, b3, T11, 5, P6, b7 (Tensões: 9, 11; a 6M é passagem para não soar G7 dominante)[cite: 276].',
          'IIIm7 -> Frígia: 1, Pb2, b3, T11, 5, Pb6, b7 (Tensão: 11; passagens: b2 e b6)[cite: 277].',
          'IV7M -> Lídia: 1, T9, 3, T#11, 5, 6, 7 (Tensões: 9, #11, 6 - escala 100% consonante sem notas de passagem)[cite: 278].',
          'V7 -> Mixolídia: 1, T9, 3, P4, 5, T13, b7 (Tensões: 9, 13; passagem: P4)[cite: 279].',
          'VIm7 -> Eólia: 1, T9, b3, T11, 5, Pb6, b7 (Tensões: 9, 11; passagem: Pb6)[cite: 280].',
          'VIIm7(b5) -> Lócria: 1, Pb2, b3, T11, b5, Tb13, b7 (Tensões: 11, b13; passagem: Pb2)[cite: 281].'
        ],
        theoryContent: [
          {
            heading: 'A Particularidade da Escala Lídia (IV7M)',
            body: 'A escala Lídia é a única escala diatónica do campo maior que não possui nenhuma nota de passagem[cite: 278]. Pelo facto de a sua quarta ser aumentada (#11), ela dista 1 tom inteiro da terça maior (em F7M: Lá para Si tem 1 tom)[cite: 278]. Por isso, o acorde IV7M(#11) é considerado o som moderno mais aberto e consonante da música popular[cite: 278].'
          },
          {
            heading: 'A Exceção da Dórica no Campo Maior',
            body: 'Na escala Dórica de Dm7 (Ré-Mi-Fá-Sol-Lá-Si-Dó), a nota Si está a 1 tom de Lá[cite: 275]. Contudo, como Si é a sensível da tonalidade de Dó Maior, tocá-la sobre Dm7 geraria o trítono Si-Fá, transformando um acorde subdominante num substituto do dominante G7(9)[cite: 275]. Por essa razão funcional, a 6M é evitada na Dórica dentro do tom maior[cite: 275, 276].'
          }
        ],
        guitarApplication: {
          rule: 'Compara no braço o acorde F7M(#11) da escala Lídia (sem notas evitadas) com o acorde G7(13) da escala Mixolídia, percebendo como a #11 brilha sem entrar em choque com a terça.',
          shapes: [
            {
              title: 'Lídia no IV7M: F7M(#11) (Cordas 6, 4, 3 e 2)',
              description: 'Fá (corda 6 c.1) -> Mi (corda 4 c.2) -> Lá (corda 3 c.2) -> Si (corda 2 c.0 ou c.4 corda 3 - T#11)[cite: 278]. Extensão pura sem choques.',
              startFret: 0,
              endFret: 4,
              markers: [
                { string: 6, fret: 1, note: 'F', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '7M' },
                { string: 3, fret: 2, note: 'A', interval: '3M' },
                { string: 2, fret: 0, note: 'B', interval: '#4' }
              ]
            },
            {
              title: 'Mixolídia no V7: G7(13) (Cordas 6, 4, 3 e 2)',
              description: 'Sol (corda 6 c.3) -> Fá (corda 4 c.3) -> Si (corda 3 c.4) -> Mi (corda 2 c.5 - T13)[cite: 279]. Cor dominante rica da Bossa Nova.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b7' },
                { string: 3, fret: 4, note: 'B', interval: '3M' },
                { string: 2, fret: 5, note: 'E', interval: '6M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-cs-scales-1',
            question: 'Qual é a única escala de acorde do campo harmónico maior que não possui nenhuma nota de passagem (evitada)[cite: 278]?',
            options: [
              'Escala Jónia (I7M)[cite: 274]',
              'Escala Lídia (IV7M)[cite: 278]',
              'Escala Mixolídia (V7)[cite: 279]',
              'Escala Dórica (IIm7)[cite: 276]'
            ],
            correctAnswer: 1,
            explanation: 'Correto! A escala Lídia possui a quarta aumentada (#11), mantendo todas as extensões a 1 tom de distância das notas de acorde[cite: 278].'
          },
          {
            id: 'q-cs-scales-2',
            question: 'Por que motivo a nota Si (6M) é considerada nota de passagem na escala Dórica em Dó Maior, apesar de distar 1 tom de Lá[cite: 275, 276]?',
            options: [
              'Porque é uma nota muito aguda para o violão',
              'Porque é a sensível do tom, fazendo o acorde subdominante Dm7 soar como o dominante G7[cite: 275]',
              'Porque desafina a escala pentatónica',
              'Porque a escala dórica proíbe sétimas'
            ],
            correctAnswer: 1,
            explanation: 'Exato! A inclusão da nota Si introduz o trítono da tonalidade, convertendo a sonoridade subdominante de Dm7 em preparação dominante antecipada[cite: 275].'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-12',
    number: 12,
    level: 'avancado',
    slug: 'escalas-para-acordes-dominantes',
    title: 'Módulo 12: Escalas para Acordes Dominantes',
    description: 'Do clássico ao alterado: Mixolídia, Mixo b9 b13, Mixo #11, Escala Alterada, Tons Inteiros e Dom-Dim.',
    lessons: [
      {
        id: 'les-12-1',
        slug: 'dominantes-diatonicos-mixo-e-mixo-b9-b13',
        title: 'Dominantes Diatónicos: Mixolídia vs. Mixo b9 b13',
        subtitle: 'A distinção fundamental entre preparar acordes maiores (T9, T13) e menores (Tb9, Tb13).',
        readingTime: '9 min de estudo + prática',
        conceptSummary: [
          'Mixolídia (V7 do Campo Maior): Fórmula 1, T9, 3, P4, 5, T13, b7. Ideal para preparar acordes maiores.',
          'Mixo b9 b13 (V7 do Campo Menor Harmónico): Fórmula 1, Tb9, 3, P4, 5, Tb13, b7. Ideal para preparar acordes menores.',
          'Mixo b13 (V7 da Menor Melódica): Fórmula 1, T9, 3, P4, 5, Tb13, b7. Combina a 9ª maior com a 13ª menor.',
          'A melodia da canção determina a escala: a presença de b9 ou 13 no tema impede o uso de escalas conflituantes.'
        ],
        theoryContent: [
          {
            heading: 'Mixolídia para Resoluções Maiores',
            body: 'Ao preparar um acorde maior (ex: G7 para C7M), a escala natural é a Mixolídia. As suas tensões diatónicas são a 9ª maior (Lá) e a 13ª maior (Mi). A quarta justa (Dó) permanece como nota de passagem para não entrar em choque com a sensível Si.'
          },
          {
            heading: 'Mixo b9 b13 para Resoluções Menores',
            body: 'Ao preparar um acorde menor (ex: E7 para Am7), a escala Mixo b9 b13 fornece as notas diatónicas do modo menor harmónico. A nona menor (Fá) e a décima terceira menor (Dó) convergem em direção à quinta e à terça de resolução, antecipando a sonoridade menor.'
          }
        ],
        guitarApplication: {
          rule: 'Compara a cor da 13ª maior no acorde G7(13) (Mi na casa 5 corda 2) com a tensão escura da b13 em G7(b13) (Mib na casa 4 corda 2).',
          shapes: [
            {
              title: 'Mixolídia Típica: G7(13) (Cordas 6, 4, 3 e 2)',
              description: 'Sol (corda 6 c.3) -> Fá (corda 4 c.3) -> Si (corda 3 c.4) -> Mi (corda 2 c.5 - T13). Resolução alegre em C7M.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: 'b7' },
                { string: 3, fret: 4, note: 'B', interval: '3M' },
                { string: 2, fret: 5, note: 'E', interval: '6M' }
              ]
            },
            {
              title: 'Mixo b9 b13: E7(b9,b13) (Cordas 5, 4, 3 e 2)',
              description: 'Mi (corda 5 c.7) -> Dó (corda 4 c.10 ou corda 2 c.6) com Sol# e Ré. Resolução tensa em Am.',
              startFret: 5,
              endFret: 8,
              markers: [
                { string: 5, fret: 7, note: 'E', interval: 'F', isRoot: true },
                { string: 4, fret: 6, note: 'G#', interval: '3M' },
                { string: 3, fret: 7, note: 'D', interval: 'b7' },
                { string: 2, fret: 6, note: 'F', interval: 'b2' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-dom-esc-1',
            question: 'Quais são as tensões características da escala Mixolídia sobre um acorde dominante?',
            options: [
              'Nona menor (b9) e décima primeira aumentada (#11)',
              'Nona maior (9) e décima terceira maior (13)',
              'Quinta diminuta (b5) e nona aumentada (#9)',
              'Apenas a quarta justa'
            ],
            correctAnswer: 1,
            explanation: 'A escala Mixolídia possui a 9ª maior e a 13ª maior como tensões naturais consonantes.'
          },
          {
            id: 'q-dom-esc-2',
            question: 'Por que razão a escala Mixo b9 b13 é a opção mais indicada para preparar acordes menores?',
            options: [
              'Porque elimina o trítono do acorde',
              'Porque as suas notas derivam da escala Menor Harmónica da tonalidade alvo',
              'Porque impede o uso do contratempo',
              'Porque tem apenas cinco notas'
            ],
            correctAnswer: 1,
            explanation: 'A escala Mixo b9 b13 é o quinto modo da Menor Harmónica, contendo as alterações naturais da tonalidade menor.'
          }
        ]
      },
      {
        id: 'les-12-2',
        slug: 'escalas-alteradas-simetricas-e-mixo-11',
        title: 'Escalas Alteradas, Simétricas & Mixo #11',
        subtitle: 'A Escala Alterada (Superlócria), Tons Inteiros, Dominante Diminuta (Dom-Dim) e Mixo #11.',
        readingTime: '10 min de estudo + prática',
        conceptSummary: [
          'Mixo #11 (Lídia b7): 1, T9, 3, T#11, 5, T13, b7. A escala padrão para acordes SubV7 e dominantes sem função resolutiva primária.',
          'Escala Alterada (Superlócria): 1, Tb9, T#9, 3, Tb5, T#5, b7. Todas as extensões alteradas. Equivale à menor melódica meio tom acima.',
          'Escala de Tons Inteiros (Hexafónica): 1, 9, 3, b5, #5, b7. Escala simétrica de 6 notas composta apenas por intervalos de tom.',
          'Escala Dominante Diminuta (Dom-Dim): 1, Tb9, T#9, 3, T#11, 5, T13, b7. Padrão Semitom-Tom simétrico de 8 notas.'
        ],
        theoryContent: [
          {
            heading: 'A Mecânica da Escala Alterada',
            body: 'A Escala Alterada é o 7º modo da escala Menor Melódica. Para tocar a Alterada de C7, toca-se a Menor Melódica de Dó sustenido (C#). Essa escala contém a tónica, a 3ª maior e a 7ª menor, acompanhadas por todas as quatro tensões alteradas possíveis: b9, #9, b5 e #5. É o pilar da sonoridade moderna no Jazz e na Bossa Nova.'
          },
          {
            heading: 'A Simetria da Tons Inteiros e da Dom-Dim',
            body: 'A escala de Tons Inteiros salta exclusivamente por intervalos de 1 tom, originando apenas duas escalas transpostas possíveis em todo o sistema musical. Já a Dom-Dim alterna semitons e tons (ST-T-ST-T-ST-T-ST-T), permitindo combinar simultaneamente a b9, a #9 e a 13 num único acorde dominante.'
          }
        ],
        guitarApplication: {
          rule: 'Experimenta o lendário acorde C7(#9) (acorde Hendrix) e percebe como ele sintetiza as tensões da escala alterada nas cordas centrais.',
          shapes: [
            {
              title: 'C7(#9) - Acorde Alterado (Cordas 5, 4, 3 e 2)',
              description: 'Dó (corda 5 c.3) -> Mi (corda 4 c.2) -> Sib (corda 3 c.3) -> Ré# (corda 2 c.4 - T#9). Tensão moderna marcante.',
              startFret: 2,
              endFret: 5,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 2, note: 'E', interval: '3M' },
                { string: 3, fret: 3, note: 'Bb', interval: 'b7' },
                { string: 2, fret: 4, note: 'D#', interval: '2M' }
              ]
            },
            {
              title: 'C7(#11) - Mixo #11 (Cordas 5, 4, 3 e 2)',
              description: 'Dó (corda 5 c.3) -> Fá# (corda 4 c.4 - T#11) -> Sib (corda 3 c.3) -> Mi (corda 2 c.5). Típico de SubV7.',
              startFret: 2,
              endFret: 6,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 4, note: 'F#', interval: '#4' },
                { string: 3, fret: 3, note: 'Bb', interval: 'b7' },
                { string: 2, fret: 5, note: 'E', interval: '3M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-alt-1',
            question: 'Qual escala menor melódica deve ser executada para solar sobre um acorde C7 utilizando a Escala Alterada?',
            options: [
              'Dó Menor Melódica',
              'Dó Sustenido (C#) Menor Melódica',
              'Si (B) Menor Melódica',
              'Sol Menor Melódica'
            ],
            correctAnswer: 1,
            explanation: 'A Escala Alterada corresponde ao 7º modo da Menor Melódica situada meio tom (1 semitom) acima do dominante.'
          },
          {
            id: 'q-alt-2',
            question: 'Qual padrão intervalar simétrico rege a Escala Dominante Diminuta (Dom-Dim)?',
            options: [
              'Tom - Tom - Tom - Tom',
              'Semitom - Tom - Semitom - Tom - Semitom - Tom - Semitom - Tom',
              'Tom - Semitom - Tom - Semitom',
              'Tom - Tom - Semitom'
            ],
            correctAnswer: 1,
            explanation: 'A Dom-Dim segue o padrão simétrico estrito de semitom seguido de tom, totalizando 8 notas (octatónica).'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-13',
    number: 13,
    level: 'avancado',
    slug: 'harmonia-modal-e-modos-gregos',
    title: 'Módulo 13: Harmonia Modal & Os 7 Modos Gregos',
    description: 'A distinção entre Tonal e Modal, as notas características, os acordes geradores e as progressões típicas dos 7 modos.',
    lessons: [
      {
        id: 'les-13-1',
        slug: 'tonalismo-vs-modalismo-e-modos-maiores',
        title: 'Tonalismo vs. Modalismo & Os Modos Maiores',
        subtitle: 'A ausência de dominantes e a assinatura dos modos Jónio, Lídio (#4) e Mixolídio (b7).',
        readingTime: '10 min de estudo + prática',
        conceptSummary: [
          'No modalismo não existem funções tonais de Tónica, Subdominante e Dominante: a música gravita em torno da sonoridade do modo.',
          'O acorde do grau I (centro modal) é mantido por longos períodos, sem preparações de trítono clássico.',
          'Modo Lídio (Maior com 4ª aumentada, #4): O modo mais brilhante da música ocidental. Acordes característicos: I7M e II7.',
          'Modo Mixolídio (Maior com 7ª menor, b7): Som folclórico, blues e baião. Acordes característicos: I (tríade) e bVII (tríade).'
        ],
        theoryContent: [
          {
            heading: 'A Diferença Entre Tonal e Modal',
            body: 'Enquanto o tonalismo constrói narrativas de afastamento e repouso (como a cadência ii - V - I), o modalismo cria atmosferas hipnóticas e estáticas. O centro da música é uma cor intervalar única gerada por uma nota característica que diferencia aquele modo da escala maior ou menor padrão.'
          },
          {
            heading: 'Os Modos Maiores e as suas Notas Assinatura',
            body: 'O modo Lídio distingue-se da escala maior pela sua 4ª aumentada (#4). A sua progressão mais emblemática alterna a tríade do grau I com o segundo grau maior (ex: C -> D). O modo Mixolídio distingue-se pela sétima menor (b7), sendo caracterizado pelo vamp entre a tónica e o acorde bVII (ex: C -> Bb).'
          }
        ],
        guitarApplication: {
          rule: 'Pratica o vamp Lídio no violão: C7M (c.3 corda 5) alternando com D/C (c.5 corda 5 com baixo em Dó c.3), ouvindo o efeito espacial da nota Fá# (#4).',
          shapes: [
            {
              title: 'Vamp Lídio: D/C sobre o Centro C',
              description: 'Dó no baixo (corda 5 c.3) mantido com o acorde de Ré Maior (corda 4 c.4 F#, corda 3 c.2 A, corda 2 c.3 D). Assinatura lídia.',
              startFret: 2,
              endFret: 5,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 4, note: 'F#', interval: '#4' },
                { string: 3, fret: 2, note: 'A', interval: '6M' },
                { string: 2, fret: 3, note: 'D', interval: '2M' }
              ]
            },
            {
              title: 'Vamp Mixolídio: Tríades C <-> Bb/C',
              description: 'Dó (corda 5 c.3) -> Sib (corda 5 c.1 ou Sib sobre baixo em Dó). A essência do rock e do baião modal.',
              startFret: 1,
              endFret: 4,
              markers: [
                { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
                { string: 4, fret: 3, note: 'F', interval: '4J' },
                { string: 3, fret: 3, note: 'Bb', interval: 'b7' },
                { string: 2, fret: 3, note: 'D', interval: '2M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-mod-1',
            question: 'Qual nota característica diferencia o Modo Lídio da Escala Maior convencional?',
            options: [
              'Segunda menor (b2)',
              'Quarta aumentada (#4)',
              'Sétima menor (b7)',
              'Sexta menor (b6)'
            ],
            correctAnswer: 1,
            explanation: 'Correto! A quarta aumentada (#4) é o intervalo assinatura que concede a sonoridade brilhante e aberta ao Modo Lídio.'
          },
          {
            id: 'q-mod-2',
            question: 'Em que consiste a dinâmica harmónica típica de uma composição puramente modal?',
            options: [
              'Encadeamento rápido de cadências ii - V - I em várias tonalidades',
              'Sustentação do centro modal por períodos longos, girando em torno de acordes que evidenciam a nota característica',
              'Obrigatoriedade de usar acordes diminutos a cada 2 compassos',
              'Ausência total de melodia'
            ],
            correctAnswer: 1,
            explanation: 'Exato! A música modal evita cadências tonais resolutivas e apoia-se em vamps estáveis que destacam a nota característica.'
          }
        ]
      },
      {
        id: 'les-13-2',
        slug: 'os-modos-menores-e-locrio',
        title: 'Os Modos Menores & O Modo Lócrio',
        subtitle: 'Dórico (6M), Frígio (b2), Eólio (b6) e Lócrio (b5): acordes geradores e progressões.',
        readingTime: '10 min de estudo + prática',
        conceptSummary: [
          'Modo Dórico (Menor com 6ª Maior): O modo menor mais utilizado no Jazz e Funk (ex: So What). Acordes: Im7 e IV7 (ex: Dm7 <-> G7).',
          'Modo Frígio (Menor com 2ª Menor): Sonoridade flamenca e sombria. Acordes: Im7 e bII7M (ex: Em7 <-> F7M).',
          'Modo Eólio (Menor Natural, b6): A escala menor pura. Acordes: Im7 e bVI7M.',
          'Modo Lócrio (Menor com b2 e b5): Centro instável com tétrade meio diminuta Im7(b5). Raramente usado como tónica estendida.'
        ],
        theoryContent: [
          {
            heading: 'A Identidade Dórica e Frígia',
            body: 'O modo Dórico transforma a melancolia do tom menor num som sofisticado graças à presença da sexta maior (6M). A clássica alternância Dm7 para G7 (sem resolver em C7M) estabelece o universo dórico. Já o modo Frígio apoia-se na tensão imediata da segunda menor (b2), gerando o icónico semitom flamenco entre Em e F.'
          },
          {
            heading: 'A Tabela Comparativa de Modos',
            body: 'Ao comparar os modos a partir da mesma tónica (Dó): Lídio (#4) -> Jónio (Natural) -> Mixolídio (b7) -> Dórico (b3, b7) -> Eólio (b3, b6, b7) -> Frígio (b2, b3, b6, b7) -> Lócrio (b2, b3, b5, b6, b7). Cada modo adiciona um bemol, escurecendo progressivamente a sonoridade.'
          }
        ],
        guitarApplication: {
          rule: 'Experimenta o vamp Dórico em Ré: Dm7 (c.5 corda 5) alternando com G7 (c.3 corda 6), escutando a nota Si (6M) a brilhar dentro do ambiente menor.',
          shapes: [
            {
              title: 'Vamp Dórico: Dm7 <-> G7 (Centro em Dm)',
              description: 'Dm7 (corda 5 c.5) -> G7 (corda 6 c.3). A nota Si em G7 é a 6ª Maior característica que define Ré Dórico.',
              startFret: 3,
              endFret: 7,
              markers: [
                { string: 5, fret: 5, note: 'D', interval: 'F', isRoot: true },
                { string: 4, fret: 7, note: 'A', interval: '5J' },
                { string: 3, fret: 5, note: 'C', interval: 'b7' },
                { string: 2, fret: 6, note: 'F', interval: '3m' }
              ]
            },
            {
              title: 'Vamp Frígio Flamenco: Em <-> F (Centro em Em)',
              description: 'Em (aberto) alternando com Fá Maior (corda 6 c.1). O semitom Fá-Mi (b2 -> 1) marca a estética flamenca.',
              startFret: 0,
              endFret: 3,
              markers: [
                { string: 6, fret: 1, note: 'F', interval: 'b2', isRoot: false },
                { string: 5, fret: 3, note: 'C', interval: '5J' },
                { string: 4, fret: 3, note: 'F', interval: 'F' },
                { string: 3, fret: 2, note: 'A', interval: '3M' }
              ]
            }
          ]
        },
        quiz: [
          {
            id: 'q-mod-menor-1',
            question: 'Qual é a nota característica do Modo Dórico em relação à Escala Menor Natural?',
            options: [
              'Quarta aumentada (#4)',
              'Segunda menor (b2)',
              'Sexta maior (6M)',
              'Quinta diminuta (b5)'
            ],
            correctAnswer: 2,
            explanation: 'Correto! A sexta maior (6M) é a assinatura exclusiva do Modo Dórico entre os modos menores.'
          },
          {
            id: 'q-mod-menor-2',
            question: 'Qual progressão harmónica de 2 acordes define o ambiente do Modo Frígio em Mi?',
            options: [
              'Em7 -> B7',
              'Em7 -> F7M (ou Em <-> F)',
              'Em7 -> A7',
              'Em7 -> C7M'
            ],
            correctAnswer: 1,
            explanation: 'Exato! A alternância entre o Im e o bII7M (Em <-> F) evidencia a segunda menor característica do Modo Frígio.'
          }
        ]
      }
    ]
  }
];