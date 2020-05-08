import { OfflineUniversalSentenceEncoderService, UniversalSentenceEncoder } from './offline-use.service';
import { Injectable } from '@angular/core';

import * as tensorflowModels from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';
import { HttpClient } from "@angular/common/http";
import { Tensor2D } from '@tensorflow/tfjs';

@Injectable()
export class DataService {

  model_LayersModel: tf.GraphModel;

  model_GraphModel: tf.GraphModel;
  model_Tokenizer: tensorflowModels.Tokenizer;

  model_UniversalSentenceEncoder: UniversalSentenceEncoder;

  embeddings: Tensor2D;

  //Specialites
  sentences = ["Abdominal Surgery",
    "General Practice",
    "Hand Surgery (Plastic Surgery)",
    "A&E Surgery",
    "Aerospace Medicine",
    "Pediatrics",
    "Abdominal Radiology",
    "Radiology",
    "General physician",
    "Ob & Gynaecology",
    "Internal Medicine",
    "Neurology",
    "General Practitioner",
    "Endocrinology",
    "Orthopedic Surgery",
    "General Surgery",
    "Diabetology",
    "Chest Physician",
    "Neuro Surgery",
    "Psychiatry",
    "Dermatology",
    "Gynecology medical",
    "Pediatric neurology",
    "Nephrology",
    "ENT",
    "Urology",
    "Gastroenterology",
    "Oncology",
    "Vascular Surgery",
    "Gynecology Oncology",
    "Urology Surgery",
    "Rheumatology",
    "Intensive Care",
    "Pharmacy",
    "Onco Surgery",
    "Oncology Radiotherapy",
    "Family Medicine",
    "Ophthalmology",
    "Rehab Medicine",
    "Hematology",
    "Neurology epilepsy",
    "Plastic Surgery",
    "Pediatrics Endocrinology",
    "Pathology",
    "Pulmonology",
    "Infectious diseases",
    "IC Surgery",
    "Xanax",
    "Clinical Cytogenetics",
    "Alkoid",
    "Covance",
    "Anatomic Pathology",
    "DIV Customer Specialty 01",
    "DIV Customer Specialty 02",
    "DIV Customer Specialty 03",
    "Chemical Pathology",
    "Caduedtrics",
    "Cardiovascular Diseases"
  ];

  //Customer with Specialites (extracted from Excel)
  customersWithSpecialities = [
    {
      contactid: "Keri Alderman",
      specialty: "Abdominal Surgery"
    },
    {
      contactid: "Darla Tran",
      specialty: "General Practice"
    },
    {
      contactid: "Shyam Bansal",
      specialty: "Hand Surgery (Plastic Surgery)"
    },
    {
      contactid: "Tabetha Mcnutt",
      specialty: "A&E Surgery"
    },
    {
      contactid: "Sue Slape",
      specialty: "Aerospace Medicine"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Pediatrics"
    },
    {
      contactid: "Elease Fridley",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Mui Bridgeforth",
      specialty: "Radiology"
    },
    {
      contactid: "Sibnath Mandal",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Christena Draughn",
      specialty: "Radiology"
    },
    {
      contactid: "Junie Marquette",
      specialty: "Abdominal Surgery"
    },
    {
      contactid: "Russ Kizer",
      specialty: "A&E Surgery"
    },
    {
      contactid: "Marcene Milera",
      specialty: "Aerospace Medicine"
    },
    {
      contactid: "Larae Kapoor",
      specialty: "Pediatrics"
    },
    {
      contactid: "Renaldo Grigsby",
      specialty: "General physician"
    },
    {
      contactid: "Nicolle Chen",
      specialty: "Ob & Gynaecology"
    },
    {
      contactid: "Sinha Neeraj",
      specialty: "Internal Medicine"
    },
    {
      contactid: "Jeremiah Ashlock",
      specialty: "Neurology"
    },
    {
      contactid: "Kaitlin Lauzon",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Grayce Souza",
      specialty: "General Practitioner"
    },
    {
      contactid: "Chana Brimer",
      specialty: "Endocrinology"
    },
    {
      contactid: "Subhir Mondal",
      specialty: "Orthopedic Surgery"
    },
    {
      contactid: "Emmitt Norwood",
      specialty: "General Surgery"
    },
    {
      contactid: "Elease Fridley",
      specialty: "Diabetology"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Chest Physician"
    },
    {
      contactid: "Sue Slape",
      specialty: "Neuro Surgery"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Psychiatry"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Dermatology"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Gynecology medical"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Pediatric neurology"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Nephrology"
    },
    {
      contactid: "Judy Lucio",
      specialty: "ENT"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Urology"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Gastroenterology"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Oncology"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Vascular Surgery"
    },
    {
      contactid: "Renea Mayer",
      specialty: "To be revised"
    },
    {
      contactid: "Judy Lucio",
      specialty: "Gynecology Oncology"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Urology Surgery"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "Rheumatology"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Intensive Care"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Pharmacy"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Onco Surgery"
    },
    {
      contactid: "Judy Lucio",
      specialty: "Oncology Radiotherapy"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "Family Medicine"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Ophthalmology"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Rehab Medicine"
    },
    {
      contactid: "Nicolle Chen",
      specialty: "Hematology"
    },
    {
      contactid: "Renaldo Grigsby",
      specialty: "Neurology epilepsy"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Plastic Surgery"
    },
    {
      contactid: "Keri Alderman",
      specialty: "Pediatrics Endocrinology"
    },
    {
      contactid: "Darla Tran",
      specialty: "Pathology"
    },
    {
      contactid: "Shyam Bansal",
      specialty: "Pulmonology"
    },
    {
      contactid: "Tabetha Mcnutt",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sue Slape",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Infectious diseases"
    },
    {
      contactid: "Elease Fridley",
      specialty: "Neurology"
    },
    {
      contactid: "Mui Bridgeforth",
      specialty: "Dermatology"
    },
    {
      contactid: "Sibnath Mandal",
      specialty: "General Practitioner"
    },
    {
      contactid: "Christena Draughn",
      specialty: "Ob & Gynaecology"
    },
    {
      contactid: "Junie Marquette",
      specialty: "General physician"
    },
    {
      contactid: "Russ Kizer",
      specialty: "Gastroenterology"
    },
    {
      contactid: "Marcene Milera",
      specialty: "Chest Physician"
    },
    {
      contactid: "Larae Kapoor",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Renaldo Grigsby",
      specialty: "Gynecology medical"
    },
    {
      contactid: "Nicolle Chen",
      specialty: "Intensive Care"
    },
    {
      contactid: "Sinha Neeraj",
      specialty: "General Surgery"
    },
    {
      contactid: "Jeremiah Ashlock",
      specialty: "Diabetology"
    },
    {
      contactid: "Kaitlin Lauzon",
      specialty: "Nephrology"
    },
    {
      contactid: "Grayce Souza",
      specialty: "To be revised"
    },
    {
      contactid: "Chana Brimer",
      specialty: "Orthopedic Surgery"
    },
    {
      contactid: "Subhir Mondal",
      specialty: "Urology"
    },
    {
      contactid: "Emmitt Norwood",
      specialty: "Oncology"
    },
    {
      contactid: "Elease Fridley",
      specialty: "Urology Surgery"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Neuro Surgery"
    },
    {
      contactid: "Sue Slape",
      specialty: "ENT"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Internal Medicine"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Family Medicine"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Onco Surgery"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Judy Lucio",
      specialty: "Rheumatology"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Endocrinology"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "Gynecology Oncology"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Vascular Surgery"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Rehab Medicine"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Psychiatry"
    },
    {
      contactid: "Judy Lucio",
      specialty: "IC Surgery"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "General Practitioner"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "General physician"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Internal Medicine"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Endocrinology"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Orthopedic Surgery"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Psychiatry"
    },
    {
      contactid: "Judy Lucio",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Neurology"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "Diabetology"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Intensive Care"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Chest Physician"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Dermatology"
    },
    {
      contactid: "Nicolle Chen",
      specialty: "Rheumatology"
    },
    {
      contactid: "Renaldo Grigsby",
      specialty: "Neuro Surgery"
    },
    {
      contactid: "Renea Mayer",
      specialty: "General Surgery"
    },
    {
      contactid: "Keri Alderman",
      specialty: "Ophthalmology"
    },
    {
      contactid: "Darla Tran",
      specialty: "Ob & Gynaecology"
    },
    {
      contactid: "Shyam Bansal",
      specialty: "Urology"
    },
    {
      contactid: "Tabetha Mcnutt",
      specialty: "ENT"
    },
    {
      contactid: "Sue Slape",
      specialty: "A&E Surgery"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Abdominal Surgery"
    },
    {
      contactid: "Elease Fridley",
      specialty: "A&E Surgery"
    },
    {
      contactid: "Mui Bridgeforth",
      specialty: "Abdominal Surgery"
    },
    {
      contactid: "Sibnath Mandal",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Christena Draughn",
      specialty: "Family Medicine"
    },
    {
      contactid: "Junie Marquette",
      specialty: "Family Medicine"
    },
    {
      contactid: "Russ Kizer",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Marcene Milera",
      specialty: "Radiology"
    },
    {
      contactid: "Larae Kapoor",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Renaldo Grigsby",
      specialty: "Radiology"
    },
    {
      contactid: "Nicolle Chen",
      specialty: "Abdominal Surgery"
    },
    {
      contactid: "Sinha Neeraj",
      specialty: "A&E Surgery"
    },
    {
      contactid: "Jeremiah Ashlock",
      specialty: "Abdominal Surgery"
    },
    {
      contactid: "Elease Fridley",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sue Slape",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Judy Lucio",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "Aerospace Medicine"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Clinical Cytogenetics"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Clinical Cytogenetics"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Family Medicine"
    },
    {
      contactid: "Judy Lucio",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Aerospace Medicine"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "Clinical Cytogenetics"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Clinical Cytogenetics"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Abdominal Surgery"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Judy Lucio",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sudipta Mukherjee",
      specialty: "Alkoid"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Covance"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Anatomic Pathology"
    },
    {
      contactid: "Christena Draughn",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Junie Marquette",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Russ Kizer",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Marcene Milera",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Larae Kapoor",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Renaldo Grigsby",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Nicolle Chen",
      specialty: "Oncology"
    },
    {
      contactid: "Sinha Neeraj",
      specialty: "Chemical Pathology"
    },
    {
      contactid: "Jeremiah Ashlock",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Kaitlin Lauzon",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Grayce Souza",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Chana Brimer",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Subhir Mondal",
      specialty: "Aerospace Medicine"
    },
    {
      contactid: "Emmitt Norwood",
      specialty: "Oncology"
    },
    {
      contactid: "Elease Fridley",
      specialty: "Oncology"
    },
    {
      contactid: "Regine Kerley",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Sue Slape",
      specialty: "Oncology"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Pediatrics"
    },
    {
      contactid: "Ernestina Michaelsen",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Ching Hepworth",
      specialty: "Caduedtrics"
    },
    {
      contactid: "Sparkle Reid",
      specialty: "Abdominal Radiology"
    },
    {
      contactid: "Renea Mayer",
      specialty: "Cardiovascular Diseases"
    },
    {
      contactid: "Judy Lucio",
      specialty: "Chemical Pathology"
    },
    {
      contactid: "Lucie Reichert",
      specialty: "Abdominal Radiology"
    }
  ];

  constructor(private http: HttpClient, private offlineUSEService: OfflineUniversalSentenceEncoderService) {
    this.loadOfflineUSEModel();
  }

  async loadOfflineUSEModel() {
    console.warn(`loadOfflineUSEModel`);

    this.model_UniversalSentenceEncoder = await this.offlineUSEService.load();
    console.info(`model_UniversalSentenceEncoder`);
    console.log(this.model_UniversalSentenceEncoder);

    this.embeddings = await this.offlineUSEService.embed(this.sentences);
    console.warn("tensorflowModels are loaded!");
  }

  async contextualSearch(searchTerm: string) {
    console.warn("contextualSearch: ", searchTerm)

    let required = [`${searchTerm}`];
    let scores = [];
    let topScore: { name: string; score: number } = null;
    let customersMatchingTopScore = [];

    if (searchTerm) {
      const inputEmbeddings = await this.offlineUSEService.embed(required);
      for (let i = 0; i < this.sentences.length; i++) {
        for (let j = 0; j < required.length; j++) {
          const sentenceI = this.embeddings.slice([i, 0], [1]);
          const sentenceJ = inputEmbeddings.slice([j, 0], [1]);
          const sentenceITranspose = false;
          const sentenceJTransepose = true;
          const score = sentenceI.matMul(sentenceJ, sentenceITranspose, sentenceJTransepose)
            .dataSync();
          scores.push({
            name: this.sentences[i],
            score: +score.join()
          })
        }
      }
      await scores.sort((a, b) => {
        return b.score - a.score
      })

      if (scores.length > 0) {
        topScore = scores[0];

        customersMatchingTopScore = this.customersWithSpecialities.filter((customer) => customer.specialty === topScore.name);
      }
    }
    else {
      customersMatchingTopScore = [];
    }

    return customersMatchingTopScore;
  }
}
