import { Injectable } from '@angular/core';

import * as tensorflowModels from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';
import { HttpClient } from "@angular/common/http";
import { Tensor2D, loadGraphModel, loadLayersModel } from '@tensorflow/tfjs';

@Injectable()
export class DataService {

  model_LayersModel: tf.GraphModel;

  model_GraphModel: tf.GraphModel;
  model_Tokenizer: tensorflowModels.Tokenizer;

  model_UniversalSentenceEncoder: tensorflowModels.UniversalSentenceEncoder;

  embeddings: Tensor2D;

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

  constructor(private http: HttpClient) {
    this.loadModels();
  }

  async fetchModelsfromAssets() {
    const MODEL_INDEXEDDB_URL = 'indexeddb://mnist-model';

    try {
      // Try loading locally saved model
      const model = await loadGraphModel(MODEL_INDEXEDDB_URL);
      console.warn('Model loaded from IndexedDB');

      return model;
    } catch (error) {
      // If local load fails, get it from the server
      try {
        const model = await loadGraphModel('assets/models/model.json');
        console.warn('Model loaded from HTTP.');

        // Store the downloaded model locally for future use
        await model.save(MODEL_INDEXEDDB_URL);
        console.warn('Model saved to IndexedDB.');

        return model;
      } catch (error) {
        console.error(error);
      }
    }
  }

  async loadModels() {
    console.warn(`loadModels`);

    this.model_LayersModel = await this.fetchModelsfromAssets();
    console.info(`model_LayersModel`);
    console.log(this.model_LayersModel);

    await this.fetchTensorFlowModels();
  }

  async fetchTensorFlowModels() {
    console.warn(`fetchTensorFlowModels`);

    this.model_UniversalSentenceEncoder = await tensorflowModels.load();
    console.info(`model_UniversalSentenceEncoder`);
    console.log(this.model_UniversalSentenceEncoder);

    this.embeddings = await this.model_UniversalSentenceEncoder.embed(this.sentences);
    console.warn("tensorflowModels are loaded!");
  }

  async contextualSearch(searchTerm: string) {
    console.warn("contextualSearch: ", searchTerm)

    let required = [`${searchTerm}`];
    let scores = [];

    const inputEmbeddings = await this.model_UniversalSentenceEncoder.embed(required);
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
          score: score.join()
        })
      }
    }
    await scores.sort(function (a, b) {
      return b.score - a.score
    })

    console.info(`scores`);
    console.log(scores);

    return scores;
  }

  // loadJSON() {
  //   return this.http.get('assets/json/vocab.json', {}).pipe(map(data => {
  //     return data;
  //   }));
  // }
}
