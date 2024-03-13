import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '../store';
interface dataType {
	order: number;
	name: string;
	description?: string;
	contents: {
		order: number;
		name: string;
		description: string;
		type?: string;
		file?: {
			name: string;
			type: string;
			url: string;
			content?: string;
			fileType?: string;
			fileUrl?: string;
			duration?: number;
		};
		materials?: {
			order: number;
			name: string;
			type: string;
			url: string;
			fileType?: string;
			fileUrl?: string;
		}[];
	}[];
}

//TODO: Add types
export interface CurriculumState {
	items: dataType[];
	selectPart: {
		order: number;
	}[];
	colletionCreate: {
		raw: { name: string; description: string; img: string; coverImg: string; soulbound: boolean };
		logoUrl: string;
		coverUrl: string;
	};
	hidden: boolean;
	change: boolean;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: CurriculumState = {
	items: [],
	selectPart: [
		{
			order: 0,
		},
	],
	colletionCreate: {
		raw: { name: '', description: '', img: '', coverImg: '', soulbound: false },
		logoUrl: '',
		coverUrl: '',
	},
	hidden: true,
	change: false,
	status: 'loading',
};


export const curriculumSlice = createSlice({
	name: 'Curriculum',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setData : (state, action) => {
			state.items = action.payload;
		},
		updateCollectionCreateData: (state, action) => {
			state.colletionCreate.raw = action.payload;
		},
		collectionUpdateImg: (state, action) => {
			state.colletionCreate.raw.img = action.payload.img;
			state.colletionCreate.logoUrl = action.payload.logoUrl;
		},
		collectionUpdateCoverImg: (state, action) => {
			state.colletionCreate.raw.coverImg = action.payload.coverImg;
			state.colletionCreate.coverUrl = action.payload.coverUrl;
		},
		changeStatus: (state) => {
			state.change = !state.change;
		},
		getLocalData: (state, action) => {
			state.items = action.payload;
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		addData: (state, action) => {
			state.items.push(action.payload);
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		updateSection: (state, action) => {
			state.items = action.payload;
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		onDragEndHandlerRedux: (state, action) => {
			//TODO: Add types
			let add,
				mainColm = state.items;
			const { destination, source, type } = action.payload;

			switch (action.payload.source.droppableId) {
				case 'MainColmTodos':
					add = mainColm[Number(source.index)];
					mainColm.splice(source.index, 1);
					break;
			}
			if (type === 'DEFAULT') {
				//@ts-ignore
				add = mainColm[Number(source.droppableId)].contents[Number(source.index)];
				//@ts-ignore
				mainColm[Number(source.droppableId)].contents.splice(Number(source.index), 1);
				if (add) {
					//@ts-ignore
					mainColm[Number(destination.droppableId)].contents.splice(
						Number(destination.index),
						0,
						add,
					);
					if (
						state.selectPart.find(
							(u: any) => u.order === mainColm[Number(Number(destination.droppableId))]?.order,
						)
					) {
						state.selectPart = state.selectPart.filter(
							(u: any) => u.order !== mainColm[Number(Number(destination.droppableId))]?.order,
						);
					} else {
						state.selectPart.push({
							order: Number(mainColm[Number(destination.droppableId)]?.order),
						});
					}
				}
			}
			if (add) {
				//@ts-ignore
				switch (destination.droppableId) {
					case 'MainColmTodos':
						//@ts-ignore
						mainColm.splice(destination.index, 0, add);
						break;
				}
				state.items = mainColm;
			}
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(mainColm));
			}
		},
		addContent: (state, action) => {
			//@ts-ignore
			state.items[action.payload.order].contents.push(action.payload.content);
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		updateDescription: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].description = action.payload.description;
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		updateContentDescription: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].description =
				action.payload.description;
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		/* updateContentType: (state, action) => {
      //@ts-ignore
      state?.items[action.payload.index]?.contents[action.payload.order]?.type = action.payload.type;
      if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
    }, */
		updateContentArticle: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].file.content =
				action.payload.content;
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].file.url = 'html';
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].file.name = 'article';
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].file.type = 'html';
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].type = 'article';
      //@ts-ignore
      state.items[action.payload.index].contents[action.payload.order].file.fileType = 'article';
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},

		renameSection: (state, action) => {
			//@ts-ignore
			state.items[action.payload.order].name = action.payload.name;
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		renameContent: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].name = action.payload.name;
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		updateFile: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].file = action.payload.file;
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].type = action.payload.type;

			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		updateMaterials: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].materials =
				action.payload.materials;
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		addMaterial: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order]?.materials.push(
				action.payload.material,
			);
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},

		removeData: (state, action) => {
			state.items = state.items.filter((item) => item.order !== action.payload);
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		deleteMaterial: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].materials.splice(
				//@ts-ignore
				action.materialIndex,
				1,
			);
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},

		removeFile: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents[action.payload.order].file = {
				name: '',
				type: '',
				url: '',
				fileType: '',
				fileUrl: '',
			};
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},

		deleteContent: (state, action) => {
			//@ts-ignore
			state.items[action.payload.index].contents = state.items[
				action.payload.index
			].contents.filter((item) => item.order !== action.payload.order);
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
		deleteSection: (state, action) => {
			//@ts-ignore
			state.items = state.items.filter((item) => item.order !== action.payload.order);
			if (window) {
				window.localStorage.setItem('lessonsData', JSON.stringify(state.items));
			}
		},
	},
});

export const {
	updateSection,
	addData,
	removeData,
	addContent,
	updateFile,
	updateMaterials,
	updateDescription,
	updateContentDescription,
	onDragEndHandlerRedux,
	renameSection,
	renameContent,
	deleteSection,
	deleteContent,
	removeFile,
	deleteMaterial,
	addMaterial,
	updateContentArticle,
	changeStatus,
	collectionUpdateCoverImg,
	collectionUpdateImg,
	updateCollectionCreateData,
	getLocalData,
	setData,
} = curriculumSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state: RootState) => ({
	data: state.Curriculum.items,
	hidden: state.Curriculum.hidden,
	status: state.Curriculum.status,
	selectPart: state.Curriculum.selectPart,
	change: state.Curriculum.change,
	colletionCreate: state.Curriculum.colletionCreate,
});

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default curriculumSlice.reducer;
