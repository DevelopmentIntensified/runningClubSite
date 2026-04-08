import { relations } from "drizzle-orm/relations";
import { user, news, session, forms } from "./schema";

export const newsRelations = relations(news, ({one}) => ({
	user: one(user, {
		fields: [news.created_by],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	news: many(news),
	sessions: many(session),
	forms: many(forms),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.user_id],
		references: [user.id]
	}),
}));

export const formsRelations = relations(forms, ({one}) => ({
	user: one(user, {
		fields: [forms.created_by],
		references: [user.id]
	}),
}));